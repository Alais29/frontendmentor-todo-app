import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/components/App'
import './assets/styles/style.scss'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
