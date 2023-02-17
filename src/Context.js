import React, { createContext, useState } from "react";

function MovieContext(children) {
  const movieCard = createContext();
  const [seats, setSeats] = useState();
  return (
    <movieCard.Provider value={(seats, setSeats)}>
      {children}
    </movieCard.Provider>
  );
}

export default MovieContext;
