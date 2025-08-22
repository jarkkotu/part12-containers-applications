const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");
const { get } = require("mongoose");

const addedTodosKey = "added_todos";

async function getAddedTodosCount() {
  const countString = await getAsync(addedTodosKey);
  const count = countString ? parseInt(countString) : 0;
  return count;
}

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const count = await getAddedTodosCount();
  const newCount = count + 1;
  await setAsync(addedTodosKey, newCount);

  res.send(todo);
});

router.get("/statistics", async (_, res) => {
  const count = await getAddedTodosCount();
  res.send({
    added_todos: count,
  });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
router.put("/:id", findByIdMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.todo._id,
      {
        text: req.body.text || req.todo.text,
        done: req.body.done !== undefined ? req.body.done : req.todo.done,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.sendStatus(404);
    }

    res.send(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update the todo" });
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
