import { Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ToDoList from "./Components/ToDoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<ToDoList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
