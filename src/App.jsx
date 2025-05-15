import ListSorter from './components/ListSorter/ListSorter.jsx';
import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import Credits from './components/Credits/Credits.jsx';
import ExpandedCredits from './components/Credits/ExpandedCredits.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useContext, useState } from 'react';
import { SelectedDataProvider } from './SelectedDataContext';

const SelectedDataContext = createContext();

function App() {
  function EnableOverlay() {
    const blackout = document.querySelector('.blackout');
    if (blackout) {
      blackout.style.display = 'flex';
    }
  }

  return (
    <SelectedDataProvider>
      <header>
        {/*<FontAwesomeIcon icon={faBars} className='bars' />*/}
        <img src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`} className='icon' />
        <div className='underline-deco'></div>
        <h1>Karma Farm List </h1>
        <div className='top-bar-extras'>
          <img src={`${import.meta.env.BASE_URL}more-icon.png`} className='more-img' onClick={() => EnableOverlay()} />
        </div>
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