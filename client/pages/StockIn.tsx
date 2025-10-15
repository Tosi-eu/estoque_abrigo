import Layout from "@/components/Layout";
import { useState } from "react";
import { MedicineForm } from "@/components/MedicineForm";
import { EquipmentForm } from "@/components/EquipmentForm";
import { OperationType } from "@/enums/enums";

export default function StockIn() {
  const [operationType, setOperationType] = useState<OperationType | "">(OperationType.MEDICINE);

  return (
    <Layout title="Entrada de Estoque">
      <div className="max-w-lg mx-auto bg-gray-50 border border-gray-300 rounded-xl p-8 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Registrar Entrada</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de entrada
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

        {operationType === OperationType.MEDICINE && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Medicamento</h3>
            <MedicineForm onSubmit={(data) => console.log("Entrada de medicamento:", data)} />
          </div>
        )}

        {operationType === OperationType.EQUIPMENT && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Equipamento</h3>
            <EquipmentForm onSubmit={(data) => console.log("Entrada de equipamento:", data)} />
          </div>
        )}
      </div>
    </Layout>
  );
}
