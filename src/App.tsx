import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import EmployeeEditPage from "./pages/employee-edit-page";
import EmployeeListPage from "./pages/employee-list-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/edit/:id" element={<EmployeeEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
