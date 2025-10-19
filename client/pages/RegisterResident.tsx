import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router";

export default function RegisterResident() {
  const [nome, setNome] = useState("");
  const [casela, setCasela] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, casela });
    navigate("/residents");
  };

  return (
    <Layout title="Cadastro de Residente e Casela">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Cadastro de Residente
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome do Residente
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Digite o nome do residente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Casela
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
              onClick={() => navigate("/residents")}
              className="px-5 py-2 border border-slate-400 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
            >
              Cadastrar Residente
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
