import React from 'react'
import MainRoute from './component/MainRoute'
import DataProvider from './GlobalContext'

function App() {
  return (
    <DataProvider>
        <MainRoute/>
    </DataProvider>
  )
}

export default App
