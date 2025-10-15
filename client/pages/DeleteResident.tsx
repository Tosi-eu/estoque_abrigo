import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

export default function DeleteResident() {
  const [name, setName] = useState("");
  const [casela, setCasela] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.toLowerCase() !== "alfredo barros") {
      setError("Paciente não encontrado!");
      return;
    }
    setError("");
    console.log("Excluindo residente:", name);
    navigate("/resident");
  };

  return (
    <Layout title="Exclusão de Residente/Paciente e Liberação da Casela">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Exclusão de Residente/Paciente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Residente/Paciente
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Digite o nome do residente"
            />
            {error && (
              <p className="text-red-600 text-xs font-medium mt-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Casela associada
            </label>
            <input
              type="text"
              value={casela}
              onChange={(e) => setCasela(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="120"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/resident")}
              className="px-5 py-2 border border-slate-400 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
            >
              Excluir Residente
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
