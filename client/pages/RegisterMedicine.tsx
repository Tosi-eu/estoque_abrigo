import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export default function RegisterMedicine() {
  const [medicine, setMedicine] = useState("");
  const [classType, setClassType] = useState("");
  const [dosage, setDosage] = useState("");
  const [unit, setUnit] = useState("mg");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!medicine || !classType || !dosage || !unit) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "Medicamento registrado!",
      description: `${medicine} (${dosage}${unit}) foi adicionado ao estoque.`,
      variant: "success",
    });

    setMedicine("");
    setClassType("");
    setDosage("");
    setUnit("mg");
    navigate("/transactions");
  };

  return (
    <Layout title="Cadastro de Novo Medicamento">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Registro de Medicamento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Medicamento
            </label>
            <input
              type="text"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Paracetamol"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classe Terapêutica
            </label>
            <input
              type="text"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2 text-sm"
              placeholder="Analgésico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosagem
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-24 border border-gray-400 rounded-md p-2 text-sm"
                placeholder="50"
              />
              {["mg", "ml", "g", "mcg"].map((u) => (
                <label
                  key={u}
                  className="flex items-center gap-1 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name="unit"
                    checked={unit === u}
                    onChange={() => setUnit(u)}
                    className="accent-gray-600"
                  />
                  {u}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setMedicine("");
                setClassType("");
                setDosage("");
                setUnit("mg");
                navigate("/transactions");
              }}
              className="px-5 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Registrar Medicamento
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
