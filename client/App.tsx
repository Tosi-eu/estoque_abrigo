import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUpMedicine from "./pages/SignUpMedicine";
import RegisterMedicine from "./pages/RegisterMedicine";
import Transactions from "./pages/Transactions";
import Stock from "./pages/Stock";
import StockEntry from "./pages/StockEntry";
import NotifyDispatch from "./pages/Notify";
import Resident from "./pages/Resident";
import NotFound from "./pages/NotFound";
import RegisterResident from "./pages/RegisterResident";
import DeleteResident from "./pages/DeleteResident";
import EditResident from "./pages/EditResident";
import StockOut from "./pages/StockOut";
import EditMedicine from "./pages/EditMedicine";
import DeleteMedicine from "./pages/DeleteMedicine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/notify" element={<NotifyDispatch />} />
          <Route path="/medicines/register" element={<SignUpMedicine />} />
          <Route path="/medicines/register/new" element={<RegisterMedicine />} />
          <Route path="/medicines/edit" element={<EditMedicine />} />
          <Route path="/medicines/delete" element={<DeleteMedicine />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/entry" element={<StockEntry />} />
          <Route path="/stock/out" element={<StockOut />} />
          <Route path="/resident" element={<Resident />} />
          <Route path="/resident/register" element={<RegisterResident />} />
          <Route path="/resident/edit" element={<EditResident />} />
          <Route path="/resident/delete" element={<DeleteResident />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
