import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import TaskDoneMetrics from "./pages/Metrics/TaskDoneMetrics";
import UserActivityMetrics from "./pages/Metrics/UserActivityMetrics";
import AverageCommentsMetrics from "./pages/Metrics/AverageCommentsMetrics";
import UserActivityDiagram from "./pages/Diagrams/UserActivityDiagram";
import TaskDoneDiagram from "./pages/Diagrams/TaskDoneDiagram";

function App() {
  return (
      <div className="app">
          <Sidebar />
          <main className="pageContainer">
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/TaskDoneMetric" element={<TaskDoneMetrics />}/>
                  <Route path="/UserActivityMetrics" element={<UserActivityMetrics />}/>
                  <Route path="/AverageCommentsMetrics" element={<AverageCommentsMetrics />}/>
                  <Route path="/UserActivityDiagram" element={<UserActivityDiagram />}/>
                  <Route path="/TaskDoneDiagram" element={<TaskDoneDiagram />}/>
              </Routes>
          </main>
      </div>

  );
}

export default App;
