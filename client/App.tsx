import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicamentos from "./pages/Medicamentos";
import CadastrarMedicamento from "./pages/CadastrarMedicamento";
import Movimentacoes from "./pages/Movimentacoes";
import Estoque from "./pages/Estoque";
import EntradaEstoque from "./pages/EntradaEstoque";
import Notificar from "./pages/Notificar";
import Residente from "./pages/Residente";
import NotFound from "./pages/NotFound";

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
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/medicamentos/cadastrar" element={<CadastrarMedicamento />} />
          <Route path="/movimentacoes" element={<Movimentacoes />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/estoque/entrada" element={<EntradaEstoque />} />
          <Route path="/notificar" element={<Notificar />} />
          <Route path="/residente" element={<Residente />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
