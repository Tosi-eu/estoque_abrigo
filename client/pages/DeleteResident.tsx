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
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Exclusão de Residente/Paciente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Residente/Paciente
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Digite o name do residente"
            />
            {error && (
              <p className="text-red-600 text-xs font-medium mt-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Casela associada
            </label>
            <input
              type="text"
              value={casela}
              onChange={(e) => setCasela(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder=" 120"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/resident")}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700"
            >
              Excluir Residente
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
