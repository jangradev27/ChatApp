import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './reducers/index.js'
import { Provider } from 'react-redux'
import { Container } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

const store= configureStore({
  reducer:RootReducer
})

createRoot(document.getElementById('root')).render(
  
   <Provider store={store}>
      <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
   </Provider>
 
)
