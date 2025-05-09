import ListSorter from './components/ListSorter/ListSorter.jsx';
import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import Credits from './components/Credits/Credits.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useContext, useState } from 'react';
import { SelectedDataProvider } from './SelectedDataContext';

const SelectedDataContext = createContext();

function App() {

  return (
    <SelectedDataProvider>
      <header>
        {/*<FontAwesomeIcon icon={faBars} className='bars' />*/}
        <img src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`} className='icon' />
        <div className='underline-deco'></div>
        <h1>Karma Farm List </h1>
      </header>

      <div className='list-bg'>
        <ListSorter />
      </div>

      <BigDisplay />
      <Credits />
      </SelectedDataProvider>
  );
}

export default App