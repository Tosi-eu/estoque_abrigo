import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

export default function SignUpEquipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    expiry: "",
    unit: "",
    form: "",
    quantity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/equipments");
  };

  return (
    <Layout title="Cadastro de Equipamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Cadastrar Equipamento</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Nome do Equipamento", field: "name", type: "text", placeholder: "Seringa 5ml" },
            { label: "Categoria", field: "category", type: "text", placeholder: "Material de Injeção" },
            { label: "Validade", field: "expiry", type: "date", placeholder: "" },
            { label: "Unidade", field: "unit", type: "text", placeholder: "Unidade, Caixa, Par..." },
            { label: "Material/Composição", field: "form", type: "text", placeholder: "Plástico, TNT..." },
            { label: "Quantidade", field: "quantity", type: "number", placeholder: "100" },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                value={formData[field as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                placeholder={placeholder}
                className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/equipments")}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
