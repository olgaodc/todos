import React, { useEffect, useState } from 'react';
import Container from '../container/container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import styles from './table.module.css';

const ItemsTable = ({ inputText }) => {
  const [todos, setTodods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(20);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const data = response.data;

        const filteredTodos = data.filter(item => item.title.includes(inputText));

        setTodods(filteredTodos);
        setCurrentPage(1);
      } catch (err) {
        console.log(err);
      }
    }

    getTodos();
  }, [inputText]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let number = 1; number <= Math.ceil(todos.length / todosPerPage); number++) {
    pageNumbers.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }


  return (
    <Container>
      {todos.length > 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {currentTodos.map(item => (
              <tr key={item.id} todos={currentTodos}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed ? '✔' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className={styles.nodata}>No data</div>
      )
      }

      <Pagination className={styles.pagination}>{pageNumbers}</Pagination>
    </Container>
  )
}

export default ItemsTable