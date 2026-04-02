import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { EmailProvider } from './context/UserEmailContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </EmailProvider>

  </StrictMode>,
)
