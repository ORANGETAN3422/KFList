import React, { useState, useEffect } from "react";

import { fetchPlatformerData } from './helpers/fetchPlatformerData';
import { fetchMainListData } from './helpers/fetchMainListData';
import { SelectedDataProvider } from './SelectedDataContext';

import MainListSorter from './components/ListSorter/MainListSorter.jsx';
import PlatformerListSorter from './components/ListSorter/PlatformerListSorter.jsx';
import SkeletonList from "./components/ListSorter/SkeletonList.jsx";

import BigDisplay from './components/BigDisplay/BigDisplay.jsx';
import Credits from './components/Credits/Credits.jsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import './index.css';

function App() {
  const [currentList, setCurrentList] = useState("classic");
  const [titleText, setTitleText] = useState("Karma Farm List");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [platformerData, setPlatformerData] = useState(null);
  const [mainListData, setMainListData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  function animateTitleChange(list) {
    document.querySelector('.underline-deco').style.width = "0";
    document.querySelector('.underline-deco').style.color = "rgba(255, 255, 255, 0)"
    setTimeout(() => {
      if (list === "classic") setTitleText("Karma Farm List");
      else if (list === "platformer") setTitleText("Platformer List")

      document.querySelector('.underline-deco').style.width = "330px";
      document.querySelector('.underline-deco').style.color = "rgba(255, 255, 255, 1)"
    }, 600);
  }

  function handleSelect(list) { 
    setDropdownVisible(false);
    if (list === currentList) return;
    animateTitleChange(list);
    setCurrentList(list);
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
        <img src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`} className='icon' />
        <div className='underline-deco'>
          <h1>{titleText}</h1>
        </div>
      </header>

      <div className="list-bg">
        <button className="drop-btn" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <FontAwesomeIcon icon={faCaretDown} className={"dropdown-arrow " + (dropdownVisible ? "arrow-rotated" : "")} />
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