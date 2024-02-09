import React, { createContext, useContext, useState } from 'react';

const ScaleContext = createContext();

export const useScale = () => useContext(ScaleContext);

export const ScaleProvider = ({ children }) => {
  const [scale, setScale] = useState(1); // Default scale is 1

  // Function to update scale
  const updateScale = (newScale) => {
    setScale(newScale);
  };

  return (
    <ScaleContext.Provider value={{ scale, updateScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
export default ScaleContext;