import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BusinessCreation from './BusinessCreation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusinessCreation />
  </StrictMode>,
)
