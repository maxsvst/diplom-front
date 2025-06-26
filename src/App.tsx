import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./containers/login/LoginPage";
import RegisterPage from "./containers/registration/RegistrationPage";
import RpdDiscipline from "./containers/rpd-discipline/RpdDiscipline";
import AddRpd from "./containers/add-rpd/AddRpd";
import AddDiscipline from "./containers/add-discipline/AddDiscipline";
import { ParseDocs } from "./containers/parse-docs/ParseDocs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
      {/* <Route path="/rpd-discipline" element={<RpdDiscipline />} /> */}
      <Route path="/add-rpd" element={<AddRpd />} />
      <Route
        path="/add-discipline"
        element={<AddDiscipline />}
      />
      <Route path='/parse-docs' element={<ParseDocs />} />
    </Routes>
  );
}

export default App;
