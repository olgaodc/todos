import React, { useState } from 'react';
import Container from '../container/container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './header.module.css';

const Header = ({onSearch}) => {
  const [inputText, setInputText] = useState('');
  
  const handleClick = () => {
    onSearch(inputText);
  }

  return (
    <div className={styles.headerWrapper}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.title}>ToDo</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter todo title"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={e=> setInputText(e.target.value)}
            />
            <Button 
              variant="outline-secondary" 
              id="button-addon2"
              onClick={handleClick}
            >
              Search
            </Button>
          </InputGroup>
        </header>
      </Container>
    </div>
  )
}

export default Header