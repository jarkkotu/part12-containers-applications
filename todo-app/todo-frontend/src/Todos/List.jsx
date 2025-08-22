import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  if (!todos || todos.length === 0) {
    return <div>No todos available</div>;
  }

  return (
    <>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <Todo todo={todo} onDelete={onClickDelete(todo)} onComplete={onClickComplete(todo)} />
          <hr />
        </React.Fragment>
      ))}
    </>
  );
};

export default TodoList;
