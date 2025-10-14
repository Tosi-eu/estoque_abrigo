import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cabinets } from "../../mocks/cabinets";

export default function DeleteCabinet() {
  const [selectedCabinet, setSelectedCabinet] = useState("");
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!selectedCabinet) {
      toast({
        title: "Seleção obrigatória",
        description: "Escolha um armário para deletar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Armário deletado",
      description: `Armário ${selectedCabinet} foi removido com sucesso.`,
      variant: "success",
    });

    setSelectedCabinet("");
    navigate("/transactions");
  };

  return (
    <Layout title="Deleção de Armário">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Deletar Armário
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecione o armário
            </label>
            <select
              value={selectedCabinet}
              onChange={(e) => setSelectedCabinet(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
            >
              <option value="">-- Escolha --</option>
              {cabinets.map((c) => (
                <option key={c.id} value={c.id}>
                  Armário {c.id} ({c.category})
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