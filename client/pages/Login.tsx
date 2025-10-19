import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 border-b border-gray-300">
        <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
            <h1 className="text-[32px] font-bold text-gray-900 hidden md:block">
              Abrigo Helena Dornfeld
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-[1651px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 sm:py-20">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Acesso ao Sistema
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="fulana_de_tal@gmail.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="*************"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 border-[1.5px] border-gray-500 rounded focus:ring-sky-300"
                />
                <label htmlFor="remember-me" className="ml-3 text-sm font-normal text-gray-900">
                  Lembrar de mim
                </label>
              </div>

              <button
                type="submit"
                className="w-full max-w-[211px] mx-auto block h-11 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors"
              >
                Entrar
              </button>

              <div className="text-center">
                <a href="#" className="text-sm font-normal text-gray-900 hover:underline">
                  Esqueci minha senha
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
