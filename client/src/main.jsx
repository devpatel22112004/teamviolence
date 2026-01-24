import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { GoogleOAuthProvider } from '@react-oauth/google'

// // Google OAuth Client ID (get from Google Cloud Console)
// // TODO: Enable Google OAuth later
// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Wrap with GoogleOAuthProvider when ready */}
    {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
      <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>,
)
