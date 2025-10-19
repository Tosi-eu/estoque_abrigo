import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function RegisterEquipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para cadastrar o equipamento.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Equipamento cadastrado",
      description: `${formData.name} foi adicionado ao sistema.`,
      variant: "success",
    });

    setFormData({ name: "", category: "" });
    navigate("/equipments");
  };

  return (
    <Layout title="Cadastro de Equipamento">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Cadastrar Equipamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "Nome do Equipamento",
              field: "name",
              placeholder: "Seringa 5ml",
            },
            {
              label: "Categoria",
              field: "category",
              placeholder: "Material de Injeção",
            },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                placeholder={placeholder}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/equipments")}
              className="px-5 py-2 border border-slate-400 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
