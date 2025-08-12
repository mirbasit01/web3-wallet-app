import React from 'react'
import Sidebar from 'Sidebar/Sidebar'
// import "./app.scss";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    
    <>
      <ToastContainer
        autoClose={5000}
        style={{ fontSize: 12, fontWeight: 300 }}
        theme="light"
        position="top-right"
      />
    <Sidebar/>
    </>
  )
}

export default App