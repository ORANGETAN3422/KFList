import React, { useState } from 'react';
import ListSorter from './components/ListSorter/MainListSorter.jsx';
import PlatformerListSorter from './components/ListSorter/PlatformerListSorter.jsx';

import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import Credits from './components/Credits/Credits.jsx';

import { SelectedDataProvider } from './SelectedDataContext';

function App() {
  const [currentList, setCurrentList] = useState("platformer");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [classicData, setClassicData] = useState(null);
  const [platformerData, setPlatformerData] = useState(null);

  const [loading, setLoading] = useState(false);

  function EnableOverlay() {
    const blackout = document.querySelector('.blackout');
    if (blackout) {
      blackout.style.display = 'flex';
    }
  }

  function renderActiveList() {
    if (currentList === "classic") {
      return <ListSorter />;
    } else if (currentList === "platformer") {
      return <PlatformerListSorter />;
    }
  }

  function handleSelect(list) {
    setCurrentList(list);
    setDropdownVisible(false);
  }

  return (
    <SelectedDataProvider>
      <header>
        {/*<FontAwesomeIcon icon={faBars} className='bars' />*/}
        <img src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`} className='icon' />
        <div className='underline-deco'></div>
        <h1>Karma Farm List</h1>
        <div className='top-bar-extras'>
          <img
            src={`${import.meta.env.BASE_URL}more-icon.png`}
            className='more-img'
            onClick={() => EnableOverlay()}
          />
        </div>
      </header>

      <div className="list-bg">
        <button className="drop-btn" onClick={() => setDropdownVisible(!dropdownVisible)}>
          Switch List
        </button>

        {dropdownVisible && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => handleSelect('classic')}>
              Classic
            </button>
            <button className="dropdown-item" onClick={() => handleSelect('platformer')}>
              Platformer
            </button>
          </div>
        )}

        {renderActiveList()}
      </div>

      <BigDisplay />
      <Credits />
    </SelectedDataProvider>
  );
}

export default App;