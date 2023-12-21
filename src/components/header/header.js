import React from 'react';
import Container from '../container/container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './header.module.css';

const Header = () => {
  return (

    <div className={styles.headerWrapper}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.title}>to do</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter to do's name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </header>
      </Container>
    </div>

  )
}

export default Header