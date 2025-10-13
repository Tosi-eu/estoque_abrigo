import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { medicines } from "../../mocks/medicines";

export default function DeleteMedicine() {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!selectedMedicine) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha um medicamento para deletar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Medicamento deletado",
      description: `${selectedMedicine} foi removido do estoque.`,
      variant: "success",
    });

    setSelectedMedicine("");
    navigate("/transactions");
  };

  return (
    <Layout title="Deleção de Medicamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Deletar Medicamento
        </h2>

        <div className="space-y-6">
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

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
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
