import React, { useState } from 'react';
import ItemsTable from '../components/table/table';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import styles from './home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
  }

  return (
    <>
      <div className={styles.contentWrapper}>
        <Header onSearch={handleSearch} />
        <ItemsTable inputText={searchTerm} />
      </div>
      <Footer />
    </>
  )
}

export default Home