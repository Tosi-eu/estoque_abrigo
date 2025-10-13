import { useState } from "react";
import Layout from "@/components/Layout";
import { residents } from "../../mocks/residents";
import Select from "react-select";

export default function EditResident() {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    room: "",
    condition: "",
    admissionDate: "",
  });

  const handleSelectChange = (selectedOption: any) => {
    const resident = residents.find((r) => r.id === selectedOption.value);
    if (resident) {
      setSelectedResident(resident);
      setFormData({
        name: resident.name,
        age: resident.age.toString(),
        room: resident.room,
        condition: resident.condition,
        admissionDate: resident.admissionDate,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!selectedResident) return alert("Selecione um residente primeiro.");
    console.log("Dados atualizados:", formData);
    alert(`Residente ${formData.name} atualizado com sucesso!`);
  };

  return (
    <Layout title="Editar Residente">
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Seletor de Residente */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Selecionar Residente
          </label>
          <Select
            options={residents.map((r) => ({
              value: r.id,
              label: r.name,
            }))}
            placeholder="Escolha um residente..."
            onChange={handleSelectChange}
            className="text-sm"
          />
        </div>

        {/* Formulário de Edição */}
        {selectedResident && (
          <div className="space-y-4 mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Idade
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Quarto
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Condição
              </label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Data de Admissão
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
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
