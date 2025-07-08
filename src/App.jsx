import React, { useState, useEffect } from "react";

import { fetchPlatformerData } from './helpers/fetchPlatformerData';
import { fetchMainListData } from './helpers/fetchMainListData';
import { SelectedDataProvider } from './SelectedDataContext';

import MainListSorter from './components/ListSorter/MainListSorter.jsx';
import PlatformerListSorter from './components/ListSorter/PlatformerListSorter.jsx';
import SkeletonList from "./components/ListSorter/SkeletonList.jsx";

import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import Credits from './components/Credits/Credits.jsx';
import ListItem from "./components/ListItem/ListItem.jsx";

import './index.css';

function App() {
  const [currentList, setCurrentList] = useState("platformer");
  const [platformerData, setPlatformerData] = useState(null);
  const [mainListData, setMainListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (currentList === "platformer" && !platformerData) {
        setLoading(true);
        const data = await fetchPlatformerData();
        setPlatformerData(data);
        setLoading(false);
      }
      if (currentList === "classic" && !mainListData) {
        setLoading(true);
        const data = await fetchMainListData();
        setMainListData(data);
        setLoading(false);
      }
    }
    loadData();
  }, [currentList]);

  function handleSelect(list) {
    setCurrentList(list);
    setDropdownVisible(false);
  }

  function renderActiveList() {
    if (loading) return <SkeletonList />;

    if (currentList === "platformer" && platformerData) {
      return <PlatformerListSorter data={platformerData} />;
    }
    if (currentList === "classic" && mainListData) {
      return <MainListSorter data={mainListData} />;
    }

    return <SkeletonList />;
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
          Change List
        </button>

          <div className={"dropdown-menu " + (dropdownVisible === true ? "dropdown-visible" : "")}>
            <button className={"dropdown-item " + `${currentList === "classic" ? "active-list" : ""}`} onClick={() => handleSelect('classic')}>
              Classic List
            </button>
            <button className={"dropdown-item " + `${currentList === "platformer" ? "active-list" : ""}`} onClick={() => handleSelect('platformer')}>
              Platformer List
            </button>
          </div>

        {renderActiveList()}
      </div>

      <BigDisplay />
      <Credits />
    </SelectedDataProvider>
  );
}

export default App;