import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { medicines } from "../../mocks/medicines";

export default function EditMedicine() {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    active: "",
    manufacturer: "",
    expiry: "",
    dosage: "",
    form: "",
    quantity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const med = medicines.find((m) => m.name === selectedMedicine);
    if (med) setFormData(med);
  }, [selectedMedicine]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha um medicamento para editar.",
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
    <Layout title="Edição de Medicamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Editar Medicamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecione o medicamento
            </label>
            <select
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
            >
              <option value="">-- Escolha --</option>
              {medicines.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {selectedMedicine && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Ativo
                </label>
                <input
                  type="text"
                  value={formData.active}
                  onChange={(e) => handleChange("active", e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fabricante
                </label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => handleChange("manufacturer", e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-2 text-sm"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Validade
                  </label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                    className="w-full border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosagem
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => handleChange("dosage", e.target.value)}
                    className="w-full border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forma
                  </label>
                  <input
                    type="text"
                    value={formData.form}
                    onChange={(e) => handleChange("form", e.target.value)}
                    className="w-full border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", Number(e.target.value))}
                  className="w-full border border-gray-400 rounded-md p-2 text-sm"
                />
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
