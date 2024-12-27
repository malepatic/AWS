import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BookEvent from "./pages/user/BookEvent"
import MyEvents from "./pages/user/MyEvents"
function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login/>}></Route>
        <Route path = "/signup" element={<Register/>}></Route>
        <Route path = "/user/book-events" element={<BookEvent/>}></Route>
        <Route path = "/user/my-events" element={<MyEvents/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;