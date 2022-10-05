import { Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";
import List from "./components/List";
import ListTwo from "./components/ListTwo";
import Login from "./components/Login";
import EditUser from "./components/users/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/list-two" element={<ListTwo />} />
        <Route path="/edit/:id" element={<Edit />} />

        <Route path="/edit-user/:id" element={<EditUser />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
