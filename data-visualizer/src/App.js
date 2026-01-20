import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import TaskDoneMetrics from "./pages/TaskDoneMetrics";

function App() {
  return (
      <div className="app">
          <Sidebar />
          <main className="pageContainer">
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/TaskDoneMetric" element={<TaskDoneMetrics />}/>
              </Routes>
          </main>
      </div>

  );
}

export default App;
