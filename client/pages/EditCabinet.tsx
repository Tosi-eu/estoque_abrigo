import { useState } from "react";
import Layout from "@/components/Layout";
import Select from "react-select";
import { cabinets } from "../../mocks/cabinets";
import { CabinetCategory } from "@/enums/enums";

export default function EditCabinet() {
  const [selectedCabinet, setSelectedCabinet] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: 0,
    category: "",
    description: "",
  });

  const handleSelectChange = (selectedOption: any) => {
    const cabinet = cabinets.find((c) => c.id === selectedOption.value);
    if (cabinet) {
      setSelectedCabinet(cabinet);
      setFormData({
        id: cabinet.id,
        category: cabinet.category,
        description: cabinet.description || "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!selectedCabinet) return alert("Selecione um armário primeiro.");
    console.log("Armário atualizado:", formData);
    alert(`Armário ${formData.id} atualizado com sucesso!`);
  };

  return (
    <Layout title="Editar Armário">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Selecionar Armário
          </label>
          <Select
            options={cabinets.map((c) => ({
              value: c.id,
              label: `Armário ${c.id} (${c.category})`,
            }))}
            placeholder="Escolha um armário..."
            onChange={handleSelectChange}
            className="text-sm"
          />
        </div>

        {selectedCabinet && (
          <div className="space-y-4 mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Número do Armário
              </label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Categoria
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {Object.entries(CabinetCategory).map(([key, label]) => (
                  <option key={key} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Descrição
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md font-bold hover:bg-gray-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}