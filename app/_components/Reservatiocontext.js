"use client";

import { createContext, useContext, useState } from "react";

const ReservatioContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservatioContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservatioContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservatioContext);
  if (context === "undefined") throw new Error("context was outside provider");
  return context;
}
export { useReservation, ReservationProvider };
