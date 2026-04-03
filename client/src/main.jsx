import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { EmailProvider } from './context/UserEmailContext.jsx'
import { UserdataProvider } from './context/UserdataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserdataProvider>
      <EmailProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </EmailProvider>
    </UserdataProvider>
  </StrictMode>,
)
