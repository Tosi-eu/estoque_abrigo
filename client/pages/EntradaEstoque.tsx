import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

enum OriginType {
  FAMILIA = "Família",
  AUTOCUSTO = "Autocusto",
  UBS = "UBS",
  FARMACIA_POPULAR = "Farmácia Popular",
}

enum EntryType {
  COMPRA = "Compra",
  DOACAO = "Doação",
  REPOSICAO = "Reposição",
}

export default function EntradaEstoque() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medication: "",
    quantity: "",
    stockType: {
      geral: false,
      individual: false,
    },
    origin: "",
    entryType: "",
    expirationDate: null as Date | null,
    date: null as Date | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/estoque");
  };

  const handleStockTypeChange = (type: "geral" | "individual") => {
    setFormData((prev) => ({
      ...prev,
      stockType: { ...prev.stockType, [type]: !prev.stockType[type] },
    }));
  };

  return (
    <Layout title="Entrada de Estoque">
      <div className="flex justify-center pt-16 min-h-screen">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medicamento */}
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

            {/* Quantidade e Vencimento */}
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
                <DatePicker
                  selected={formData.expirationDate}
                  onChange={(date: Date | null) =>
                    setFormData({ ...formData, expirationDate: date })
                  }
                  locale={ptBR}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                  className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple"
                />
              </div>
            </div>

            {/* Tipo de estoque */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Tipo de estoque
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="geral"
                    checked={formData.stockType.geral}
                    onChange={() => handleStockTypeChange("geral")}
                    className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                  />
                  <label htmlFor="geral" className="text-base text-gray-900">
                    Geral
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="individual"
                    checked={formData.stockType.individual}
                    onChange={() => handleStockTypeChange("individual")}
                    className="w-6 h-6 border-gray-800 rounded focus:ring-purple"
                  />
                  <label htmlFor="individual" className="text-base text-gray-900">
                    Individual
                  </label>
                </div>
              </div>
            </div>

            {/* Origem */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Origem
              </label>
              <select
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
                className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-base font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              >
                <option value="">Selecione uma origem</option>
                {Object.entries(OriginType).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de entrada */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Tipo de entrada
              </label>
              <select
                value={formData.entryType}
                onChange={(e) =>
                  setFormData({ ...formData, entryType: e.target.value })
                }
                className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-base font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              >
                <option value="">Selecione o tipo de entrada</option>
                {Object.entries(EntryType).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Data de entrada */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Data
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date: Date | null) =>
                  setFormData({ ...formData, date })
                }
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data"
                className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            {/* Botões */}
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
      </div>
    </Layout>
  );
}