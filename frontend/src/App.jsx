import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import FileUploader from './components/FileUpload'

function App() {

  return (
    <>
    <Header></Header>
    <FileUploader></FileUploader>
    </>
  )
}

export default App
