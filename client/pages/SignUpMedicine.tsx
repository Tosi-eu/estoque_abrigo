import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function SignUpMedicine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    activeIngredient: "",
    manufacturer: "",
    dosageValue: "",
    unit: "mg",
    administrationForm: "",
    minStock: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      activeIngredient,
      manufacturer,
      dosageValue,
      administrationForm,
      minStock,
    } = formData;

    if (
      !name ||
      !activeIngredient ||
      !manufacturer ||
      !dosageValue ||
      !administrationForm ||
      !minStock
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de continuar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Medicamento cadastrado!",
      description: `${name} (${formData.dosageValue}${formData.unit}) foi registrado com sucesso.`,
      variant: "success",
    });

    navigate("/transactions");
  };

  return (
    <Layout title="Cadastro de Medicamento">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Cadastro de Medicamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "Nome do medicamento",
              field: "name",
              type: "text",
              placeholder: "Paracetamol",
            },
            {
              label: "Princípio ativo",
              field: "activeIngredient",
              type: "text",
              placeholder: "Paracetamol",
            },
            {
              label: "Fabricante",
              field: "manufacturer",
              type: "text",
              placeholder: "Fulanos LTDA",
            },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                placeholder={placeholder}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dosagem
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.dosageValue}
                onChange={(e) =>
                  setFormData({ ...formData, dosageValue: e.target.value })
                }
                className="w-24 border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                placeholder="500"
              />
              {["mg", "ml", "g", "mcg"].map((u) => (
                <label
                  key={u}
                  className="flex items-center gap-1 text-sm cursor-pointer text-slate-700"
                >
                  <input
                    type="radio"
                    name="unit"
                    checked={formData.unit === u}
                    onChange={() => setFormData({ ...formData, unit: u })}
                    className="text-sky-600 focus:ring-sky-300"
                  />
                  {u}
                </label>
              ))}
            </div>
          </div>

          {[
            {
              label: "Forma de administração",
              field: "administrationForm",
              type: "text",
              placeholder: "Comprimido",
            },
            {
              label: "Estoque mínimo",
              field: "minStock",
              type: "number",
              placeholder: "10",
            },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                placeholder={placeholder}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
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