import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import logo from "/logo.png";
import { LayoutProps } from "@/interfaces/interfaces";

export default function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigation = [
    { name: "Painel", href: "/dashboard" },
    { name: "Movimentações", href: "/transactions" },
    {
      name: "Medicamentos",
      href: "/medicines",
      subRoutes: [
        { name: "Cadastrar Medicamento", href: "/medicines/register" },
        { name: "Editar Medicamento", href: "/medicines/edit" },
        { name: "Deletar Medicamento", href: "/medicines/delete" },
      ],
    },
    {
      name: "Equipamentos",
      href: "/equipments",
      subRoutes: [
        { name: "Cadastrar Equipamento", href: "/equipments/register" },
        { name: "Editar Equipamento", href: "/equipments/edit" },
        { name: "Deletar Equipamento", href: "/equipments/delete" },
      ],
    },
    {
      name: "Estoque",
      href: "/stock",
      subRoutes: [
        { name: "Entrada de Estoque", href: "/stock/entry" },
        { name: "Saída de Estoque", href: "/stock/out" },
      ],
    },
    {
      name: "Residentes",
      href: "/resident",
      subRoutes: [
        { name: "Cadastrar Residente", href: "/resident/register" },
        { name: "Editar Residente", href: "/resident/edit" },
        { name: "Deletar Residente", href: "/resident/delete" },
      ],
    },
    {
      name: "Armários",
      href: "#",
      subRoutes: [
        { name: "Cadastrar Armário", href: "/cabinet/register" },
        { name: "Editar Armário", href: "/cabinet/edit" },
        { name: "Deletar Armário", href: "/cabinet/delete" },
      ],
    },
  ];

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="bg-sky-50 border-b border-slate-200 shadow-sm relative z-20">
        <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/dashboard">
              <img src={logo} alt="Logo" className="h-20 w-auto drop-shadow-sm" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/dashboard" && location.pathname.startsWith(item.href));

                if (item.subRoutes) {
                  const isOpen = openDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={item.href}
                        className={`inline-flex items-center text-base px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-sky-700 bg-sky-100 font-semibold"
                            : "text-slate-700 hover:text-sky-700 hover:bg-sky-50"
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </Link>

                      <div
                        className={`absolute left-0 w-60 bg-white border border-slate-200 rounded-lg shadow-md transition-all duration-300 ${
                          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                      >
                        {item.subRoutes.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block px-4 py-2 text-slate-700 hover:bg-sky-50 hover:text-sky-700 text-sm"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-base px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-sky-700 bg-sky-100 font-semibold"
                        : "text-slate-700 hover:text-sky-700 hover:bg-sky-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {title && (
        <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
        </div>
      )}

      <main className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
    </div>
  );
}