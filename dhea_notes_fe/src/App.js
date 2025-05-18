import {BrowserRouter, Routes, Route} from "react-router-dom";
import CatatanList from "./components/CatatanList";
import AddCatatan from "./components/AddCatatan";
import EditCatatan from "./components/EditCatatan";
import LoginUser from "./components/LoginUser";
import SignUp from "./components/SignupUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="catatan" element={<CatatanList/>}/>
        <Route path="add" element={<AddCatatan/>}/>
        <Route path="edit/:id" element={<EditCatatan/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;