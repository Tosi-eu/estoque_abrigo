import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EntradaEstoque() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medication: "",
    quantity: "",
    stockType: "geral",
    origin: "",
    entryType: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/estoque");
  };

  return (
    <Layout title="Entrada de Estoque">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Medicamento e Dosagem
            </label>
            <input
              type="text"
              value={formData.medication}
              onChange={(e) =>
                setFormData({ ...formData, medication: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              placeholder="Paracetamol - 50 mg/ml"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Quantidade
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="12"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Data de vencimento
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="29/09/2027"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tipo de estoque
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="geral"
                  name="stockType"
                  checked={formData.stockType === "geral"}
                  onChange={() =>
                    setFormData({ ...formData, stockType: "geral" })
                  }
                  className="w-6 h-6 text-purple focus:ring-purple"
                />
                <label htmlFor="geral" className="text-base text-gray-900">
                  Estoque geral
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                />
                <label className="text-base text-gray-900">
                  Estoque individual
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Origem
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                />
                <label className="text-base text-gray-900">Família</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                />
                <label className="text-base text-gray-900">
                  Farmácia Popular
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                />
                <label className="text-base text-gray-900">Autocusto</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                />
                <label className="text-base text-gray-900">UBS</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tipo de entrada (Compra/Doação/Reposição)
            </label>
            <input
              type="text"
              value={formData.entryType}
              onChange={(e) =>
                setFormData({ ...formData, entryType: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              placeholder="Doação"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Data
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              placeholder="12/09/2025"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/estoque")}
              className="px-8 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
            >
              Registrar entrada
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
