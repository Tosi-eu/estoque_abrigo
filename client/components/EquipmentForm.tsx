import { useState } from "react";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

export function EquipmentForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiry: null as Date | null,
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Equipamento</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Seringa 5ml"
          className="w-full border border-gray-400 rounded-md p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Material Hospitalar"
          className="w-full border border-gray-400 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full border border-gray-400 rounded-md p-2 text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
          <input
            type="text"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Caixa / Unidade / Par..."
            className="w-full border border-gray-400 rounded-md p-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
        <DatePicker
          selected={formData.expiry}
          onChange={(date: Date | null) => setFormData({ ...formData, expiry: date })}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data"
          className="w-full border border-gray-400 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSubmit(formData)}
          className="px-5 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
