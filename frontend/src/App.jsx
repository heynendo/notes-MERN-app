import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import EditNote from "./pages/EditNote"
import CreateNote from "./pages/CreateNote"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/note/:id" element={<EditNote />} />
        <Route path="/note/create" element={<CreateNote />} />
      </Routes>
    </>
  )
}

export default App