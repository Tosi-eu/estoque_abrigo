import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OperationType } from "../enums/enums";
import { MedicineForm } from "@/components/MedicineForm";
import { EquipmentForm } from "@/components/EquipmentForm";

export default function StockOut() {
  const [operationType, setOperationType] = useState<OperationType | "">(OperationType.EQUIPMENT);
  const navigate = useNavigate();

  return (
    <Layout title="Saída de Estoque">
      <div className="max-w-lg mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl p-8 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Registrar Saída</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de saída
          </label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as OperationType)}
            className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">Selecione</option>
            <option value={OperationType.MEDICINE}>{OperationType.MEDICINE}</option>
            <option value={OperationType.EQUIPMENT}>{OperationType.EQUIPMENT}</option>
          </select>
        </div>

        {/* Renderização condicional do formulário */}
        {operationType === OperationType.MEDICINE && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Medicamento</h3>
            <MedicineForm onSubmit={(data) => console.log("Saída de medicamento:", data)} />
          </div>
        )}

        {operationType === OperationType.EQUIPMENT && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Equipamento</h3>
            <EquipmentForm onSubmit={(data) => console.log("Saída de equipamento:", data)} />
          </div>
        )}

        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/stock")}
            className="px-6 py-2 border border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-100"
          >
            Voltar
          </button>
        </div>
      </div>
    </Layout>
  );
}
