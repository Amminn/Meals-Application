import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.css'
import {ContextProvider} from './Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  // </React.StrictMode>
)
