const Filter = ({filter, setFilter}) => 
{
    const handleFilterChange = (event) => {
        console.log('handleFilterChange', event.target.value)
        setFilter(event.target.value)
      }

    return <p>filter shown with <input value={filter} onChange={handleFilterChange}></input></p>
}

export default Filter