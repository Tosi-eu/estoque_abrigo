import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

export default function DeleteResident() {
  const [nome, setNome] = useState("");
  const [casela, setCasela] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.toLowerCase() !== "alfredo barros") {
      setErro("Paciente não encontrado!");
      return;
    }
    setErro("");
    console.log("Excluindo residente:", nome);
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Digite o nome do residente"
            />
            {erro && (
              <p className="text-red-600 text-xs font-medium mt-1">
                ⚠️ {erro}
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
