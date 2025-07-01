import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import BusinessSettings from "./pages/BusinessSettings";
import SavedInvoices from "./pages/SavedInvoices";
import BulkUpload from "./pages/BulkUpload";

// Inline Layout Component
const InlineLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    {/* Replace with your real layout: sidebar, navbar, etc. */}
    <header style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <h1>My App Navbar</h1>
    </header>
    <main style={{ padding: "2rem" }}>{children}</main>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route without layout */}
            <Route path="/auth" element={<Auth />} />

            {/* Public route with layout */}
            <Route path="/" element={<InlineLayout><Index /></InlineLayout>} />
            <Route path="/invoices" element={<InlineLayout><Invoices /></InlineLayout>} />

            {/* Protected routes with layout */}
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <InlineLayout><Customers /></InlineLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/business-settings"
              element={
                <ProtectedRoute>
                  <InlineLayout><BusinessSettings /></InlineLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-invoices"
              element={
                <ProtectedRoute>
                  <InlineLayout><SavedInvoices /></InlineLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bulk-upload"
              element={
                <ProtectedRoute>
                  <InlineLayout><BulkUpload /></InlineLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
