import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function EditEquipment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
  });

  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item;

      const normalized = {
        name: item.name || item.itemName || "",
        description: item.description || "",
        quantity: item.quantity || 0,
      };

      setSelectedEquipment(normalized.name);
      setFormData(normalized);
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedEquipment) {
      const eq = hospitalItems.find((e) => e.name === selectedEquipment);
      if (eq) setFormData(eq);
    } else {
      setFormData({ name: "", description: "", quantity: 0 });
    }
  }, [selectedEquipment]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Editar Equipamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome do equipamento
            </label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full border bg-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
            >
              <option value="">Escolha</option>
              {hospitalItems.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantidade
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}