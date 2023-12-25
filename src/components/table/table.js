import React, { useEffect, useState } from 'react';
import Container from '../container/container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import styles from './table.module.css';

const ItemsTable = ({ inputText }) => {
  const [todos, setTodods] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(20);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const data = response.data;

        const filteredTodos = data.filter(item => item.title.includes(inputText.toLowerCase()));

        setTodods(filteredTodos);
        setCurrentPage(1);
      } catch (err) {
        console.log(err);
      } finally {
        setLoaded(true);
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
      {isLoaded ? (
        todos.length > 0 ? (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {currentTodos.map(item => (
                  <tr key={item.id} todos={currentTodos}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.completed ? '✔' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className={styles.pagination}>{pageNumbers}</Pagination>
          </>
        ) : (<div className={styles.nodata}>No data</div>)
      ) : (
        <div className={styles.spinnerWrpper}>
          <Spinner animation="border" />
        </div>
      )
      }
    </Container>
  )
}

export default ItemsTable