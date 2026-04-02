import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { ErrorBoundary } from '@/components/error/boundary';
import { RouteErrorBoundary } from '@/components/error/route-error-boundary';
import { HomePage } from '@/pages/home'
import { AppPage } from '@/pages/app'
import { HistoryPage } from '@/pages/history'
import { AdminPage } from '@/pages/admin'
import { PrivacyPage } from '@/pages/privacy'
import { TermsPage } from '@/pages/terms'
import { ContactPage } from '@/pages/contact'
import '@/index.css'
import { Toaster } from 'sonner'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "https://agile-bobcat-932.convex.cloud");

// Handle module load failures (e.g., after deployment with stale chunks)
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app",
    element: <AppPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app/history",
    element: <HistoryPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app/admin",
    element: <AdminPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);

// Signal to parent frame that app is ready
const notifyParentReady = () => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'preview-ready', url: location.href }, '*')
  }
}

// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
      <Toaster />
    </ConvexAuthProvider>
  </StrictMode>,
)

// Notify after initial render completes (with fallbacks)
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(notifyParentReady)
} else {
  setTimeout(notifyParentReady, 0)
}
// Also notify on load as backup in case idle callback is delayed
window.addEventListener('load', notifyParentReady, { once: true })
   