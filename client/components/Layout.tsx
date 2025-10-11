import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: "Painel", href: "/dashboard" },
    { name: "Medicamentos", href: "/medicamentos" },
    { name: "Movimentações", href: "/movimentacoes" },
    { name: "Estoque", href: "/estoque" },
    { name: "Notificar", href: "/notificar" },
    { name: "Residente", href: "/residente" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-300">
        <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-lg font-normal text-gray-900">
                Logo
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-lg font-normal transition-colors ${
                        isActive
                          ? "text-gray-900 font-medium"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      {title && (
        <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
    </div>
  );
}
