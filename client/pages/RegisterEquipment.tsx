import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export default function RegisterEquipment() {
  const [equipment, setEquipment] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [unit, setUnit] = useState("unidade");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipment || !category || !material || !unit || !quantity) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Equipamento registrado!",
      description: `${equipment} (${quantity} ${unit}) foi adicionado ao estoque.`,
      variant: "success",
    });

    setEquipment("");
    setCategory("");
    setMaterial("");
    setUnit("unidade");
    setQuantity("");
    navigate("/equipments");
  };

  return (
    <Layout title="Cadastro de Novo Equipamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Registro de Equipamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Equipamento
            </label>
            <input
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Seringa 5ml"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Material de Injeção"
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setEquipment("");
                setCategory("");
                navigate("/equipments");
              }}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Registrar Equipamento
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
