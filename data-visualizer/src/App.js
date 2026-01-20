import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import TaskDoneMetrics from "./pages/TaskDoneMetrics";
import UserActivityMetrics from "./pages/UserActivityMetrics";
import AverageCommentsMetrics from "./pages/AverageCommentsMetrics";

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
              </Routes>
          </main>
      </div>

  );
}

export default App;
