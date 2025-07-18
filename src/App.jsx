import React, { useState, useEffect, useRef } from "react";

import { fetchPlatformerData } from './helpers/fetchPlatformerData';
import { fetchMainListData } from './helpers/fetchMainListData';
import { SelectedDataProvider } from './SelectedDataContext';

import Header from "./components/Header/Header.jsx";
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

  const headerRef = useRef();

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

  const handleListChange = (list) => {
    setCurrentList(list);
    if (headerRef.current) {
      headerRef.current.animateTitleChange();
    }
  }

  return (
    <SelectedDataProvider>
      <Header ref={headerRef} currentList={currentList} />

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