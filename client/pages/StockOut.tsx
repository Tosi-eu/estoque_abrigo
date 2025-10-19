import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OperationType } from "@/enums/enums";
import { MedicineForm } from "@/components/MedicineForm";
import { EquipmentForm } from "@/components/EquipmentForm";

export default function StockOut() {
  const [operationType, setOperationType] = useState<
    OperationType | "Selecione"
  >("Selecione");
  const navigate = useNavigate();

  return (
    <Layout title="Saída de Estoque">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Registrar Saída
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tipo de saída
          </label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as OperationType)}
            className="
              w-full
              border border-slate-300
              rounded-lg
              p-2.5
              text-sm
              bg-white
              text-slate-800
              shadow-sm
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-sky-300
              hover:border-slate-400
            "
          >
            <option value="">Selecione</option>
            <option value={OperationType.MEDICINE}>
              {OperationType.MEDICINE}
            </option>
            <option value={OperationType.EQUIPMENT}>
              {OperationType.EQUIPMENT}
            </option>
          </select>
        </div>

        {operationType === OperationType.MEDICINE && (
          <div>
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Medicamento
            </h3>
            <MedicineForm onSubmit={() => navigate("/stock")} />
          </div>
        )}

        {operationType === OperationType.EQUIPMENT && (
          <div>
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Equipamento
            </h3>
            <EquipmentForm onSubmit={() => navigate("/stock")} />
          </div>
        )}
      </div>
    </Layout>
  );
}
