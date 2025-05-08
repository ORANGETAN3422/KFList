import ListSorter from './components/ListSorter/ListSorter.jsx';
import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useContext, useState } from 'react';
import { SelectedDataProvider } from './SelectedDataContext';

const SelectedDataContext = createContext();

function App() {

  return (
    <SelectedDataProvider>
      <header>
        <FontAwesomeIcon icon={faBars} className='bars' />
        <h1>Karma Farm List </h1>
      </header>

      <div className='list-bg'>
        <ListSorter />
      </div>

      <BigDisplay />
      </SelectedDataProvider>
  );
}

export default App