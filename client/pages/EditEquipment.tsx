import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router";
import { toast } from "@/hooks/use-toast";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function EditEquipment() {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    expiry: "",
    unit: "",
    form: "",
    quantity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const eq = hospitalItems.find((e) => e.name === selectedEquipment);
    if (eq) setFormData(eq);
  }, [selectedEquipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha um equipamento para editar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Equipamento atualizado",
      description: `${formData.name} foi atualizado com sucesso.`,
      variant: "success",
    });

    navigate("/equipments");
  };

  return (
    <Layout title="Edição de Equipamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Editar Equipamento</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o equipamento</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
            >
              <option value="">-- Escolha --</option>
              {hospitalItems.map((eq) => (
                <option key={eq.name} value={eq.name}>
                  {eq.name}
                </option>
              ))}
            </select>
          </div>

          {selectedEquipment && (
            <>
              {[
                { label: "Categoria", field: "category", type: "text" },
                { label: "Validade", field: "expiry", type: "date" },
                { label: "Unidade", field: "unit", type: "text" },
                { label: "Material/Composição", field: "form", type: "text" },
                { label: "Quantidade", field: "quantity", type: "number" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
              ))}
            </>
          )}

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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
