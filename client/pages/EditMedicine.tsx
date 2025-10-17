import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { medicines } from "../../mocks/medicines";

export default function EditMedicine() {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    active: "",
    dosage: "",
    form: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const med = medicines.find((m) => m.name === selectedMedicine);
    if (med) setFormData(med);
  }, [selectedMedicine]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha ou digite um medicamento.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Medicamento atualizado",
      description: `${formData.name} foi atualizado com sucesso.`,
      variant: "success",
    });

    navigate("/transactions");
  };

  return (
    <Layout title="Editar Medicamento">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Edição de Medicamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Selecione o medicamento
            </label>
            <select
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="
                w-full
                border border-slate-300
                rounded-lg
                p-2.5
                text-sm
                bg-white
                text-slate-800
                shadow-sm
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-sky-300
                hover:border-slate-400
              "
            >
              <option value="">Escolha</option>
              {medicines.map((m) => (
                <option key={m.name} value={m.name}>  
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          {selectedMedicine && (
            <div className="space-y-5 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome Ativo
                </label>
                <input
                  type="text"
                  value={formData.active}
                  onChange={(e) => handleChange("active", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Dosagem
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => handleChange("dosage", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Forma
                  </label>
                  <input
                    type="text"
                    value={formData.form}
                    onChange={(e) => handleChange("form", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ name: "", active: "", dosage: "", form: "" })
                  }
                  className="px-5 py-2 border border-slate-400 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
