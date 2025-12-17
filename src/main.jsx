import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'
import './styles/index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Check if Clerk key is valid (not empty and not placeholder)
const isValidClerkKey = clerkPubKey &&
                       clerkPubKey !== 'your_clerk_publishable_key_here' &&
                       clerkPubKey.startsWith('pk_');

if (!isValidClerkKey) {
  console.warn('⚠️ Clerk not configured. Running in local-only mode.\nTo enable authentication, add your Clerk key to .env.local\nGet your key from: https://dashboard.clerk.com');
}

// Wrapper to conditionally add ClerkProvider
const AppWrapper = isValidClerkKey ?
  ({ children }) => <ClerkProvider publishableKey={clerkPubKey}>{children}</ClerkProvider> :
  ({ children }) => <>{children}</>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper>
      <BrowserRouter>
        <ToastProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </ToastProvider>
      </BrowserRouter>
    </AppWrapper>
  </React.StrictMode>,
)
