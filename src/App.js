import { Routes, Route } from "react-router-dom";

import LoginPage from "./containers/login/LoginPage";
import RegisterPage from "./containers/registration/RegistrationPage";
import RpdDiscipline from "./containers/rpd-discipline/RpdDiscipline";
import AddRpd from "./containers/add-rpd/AddRpd";
import ShowRpd from "./containers/show-rpd/ShowRpd";
import AddDiscipline from "./containers/add-discipline/AddDiscipline";
import EditDiscipline from "./containers/edit-discipline/EditDiscipline";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="registration" element={<RegisterPage />} />
      <Route path="/rpd-discipline" element={<RpdDiscipline />} />
      <Route path="/rpd-discipline/add-rpd" element={<AddRpd />} />
      <Route path="/rpd-discipline/show-rpd" element={<ShowRpd />} />
      <Route
        path="/rpd-discipline/add-discipline"
        element={<AddDiscipline />}
      />
      <Route
        path="/rpd-discipline/edit-discipline"
        element={<EditDiscipline />}
      />
    </Routes>
  );
}

export default App;
