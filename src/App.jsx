import React, { useState, useEffect } from "react";

import { fetchPlatformerData } from './helpers/fetchPlatformerData';
import { fetchMainListData } from './helpers/fetchMainListData';
import { SelectedDataProvider } from './SelectedDataContext';

import ListDisplay from "./components/ListDisplay/ListDisplay.jsx";
import BigDisplay from './components/DetailsDisplay/DetailsDisplay.jsx';
import Credits from './components/CreditsDisplay/CreditsDisplay.jsx';

import './index.css';

function App() {
  const [currentList, setCurrentList] = useState("classic");
  const [titleText, setTitleText] = useState("Karma Farm List");

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
    const underlineDeco = document.querySelector('.underline-deco')
    const icon = document.querySelector('.icon')
    const widthStyles = { "collapsed": "0", "open": "330px" }
    const colorStyles = { "collapsed": "rgba(255, 255, 255, 0)", "open": "rgba(255, 255, 255, 1)" }

    underlineDeco.style.width = widthStyles.collapsed;
    underlineDeco.style.color = colorStyles.collapsed;
    icon.classList.add('spin');
    setTimeout(() => {
      setTitleText(list === "classic" ? "Karma Farm List" : "Platformer List");

      underlineDeco.style.width = widthStyles.open
      underlineDeco.style.color = colorStyles.open
    }, 600);
    setTimeout(() => {
      icon.classList.remove('spin');
    }, 1200);
  }

  const handleListChange = (list) => {
    setCurrentList(list);
    animateTitleChange(list);
  }

  return (
    <SelectedDataProvider>
      <header>
        <img src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`} className='icon' />
        <div className='underline-deco'>
          <h1>{titleText}</h1>
        </div>
      </header>

      <ListDisplay
        loading={loading}
        currentList={currentList}
        platformerData={platformerData}
        mainListData={mainListData}
        onListChange={handleListChange}
      />

      <BigDisplay />
      <Credits />
    </SelectedDataProvider>
  );
}

export default App;