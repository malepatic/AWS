import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login/>}></Route>
        <Route path = "/signup" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;