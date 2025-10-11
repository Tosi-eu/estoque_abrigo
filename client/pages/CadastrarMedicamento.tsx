import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarMedicamento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    activeIngredient: "",
    manufacturer: "",
    dosage: "",
    administrationForm: "",
    minStock: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/medicamentos");
  };

  return (
    <Layout title="Cadastro de Medicamentos">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Nome do medicamento
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="Parecetamol"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Princípio ativo
            </label>
            <input
              type="text"
              value={formData.activeIngredient}
              onChange={(e) =>
                setFormData({ ...formData, activeIngredient: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="Paracetamol"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Fabricante
            </label>
            <input
              type="text"
              value={formData.manufacturer}
              onChange={(e) =>
                setFormData({ ...formData, manufacturer: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="Fulanos LTDA"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Concentração/Dosagem
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({ ...formData, dosage: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="50mg/ml"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Forma de administração
            </label>
            <input
              type="text"
              value={formData.administrationForm}
              onChange={(e) =>
                setFormData({ ...formData, administrationForm: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="Comprimido"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Estoque mínimo
            </label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) =>
                setFormData({ ...formData, minStock: e.target.value })
              }
              className="w-full h-10 px-3 bg-white border-[1.5px] border-gray-500 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="10"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/medicamentos")}
              className="px-8 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Cadastrar/Editar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
