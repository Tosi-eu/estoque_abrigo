import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router";
import { toast } from "@/hooks/use-toast";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function DeleteEquipment() {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!selectedEquipment) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha um equipamento para deletar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Equipamento deletado",
      description: `${selectedEquipment} foi removido do sistema.`,
      variant: "success",
    });

    setSelectedEquipment("");
    navigate("/equipments");
  };

  return (
    <Layout title="Exclusão de Equipamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Deletar Equipamento</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecione o equipamento
            </label>
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

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/equipments")}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
