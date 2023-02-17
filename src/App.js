import Header from "./component/Header";
import Theator from "./component/Theator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Screen from "./component/Screen";
import Ticket from "./component/Ticket";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/theator/:Name" element={<Theator />} />
          <Route path="/screen/:malls/:Name/:showTime" element={<Screen />} />
          <Route
            path="/ticket/:malls/:Name/:showTime/:selectedCeats/:price"
            element={<Ticket />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
