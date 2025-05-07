// SelectedDataContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedDataContext = createContext();

export function SelectedDataProvider({ children }) {
  const [selectedData, setSelectedData] = useState(null);
  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </SelectedDataContext.Provider>
  );
}

export function useSelectedData() {
  return useContext(SelectedDataContext);
}
