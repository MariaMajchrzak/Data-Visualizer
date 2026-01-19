import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Statistics from "./pages/Statistics";

function App() {
  return (
      <div className="app">
          <Sidebar />
          <main className="pageContainer">
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/Statistics" element={<Statistics />}/>
              </Routes>
          </main>
      </div>

  );
}

export default App;
