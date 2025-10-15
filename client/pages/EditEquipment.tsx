import { useState } from "react";
import Layout from "@/components/Layout";
import { residents } from "../../mocks/residents";

export default function EditResident() {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", casela: null });

  const handleSelectChange = (value: string) => {
    const resident = residents.find((r) => r.casela === parseInt(value) || r.name === value);
    if (resident) {
      setSelectedResident(resident);
      setFormData({ name: resident.name, casela: resident.casela });
    } else {
      setSelectedResident(null);
      setFormData({ name: "", casela: value });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!selectedResident) {
      alert(`Residente ${formData.name} atualizado com sucesso!`);
      return;
    }
    alert(`Residente ${formData.name} atualizado com sucesso!`);
  };

  return (
    <Layout title="Editar Residente">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Edição de Residente
        </h2>

        <div className="space-y-6">
          {/* Campo de seleção de residente com mesmo estilo do select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Selecione o residente
            </label>
            <input
              list="residentes-lista"
              value={formData.casela}
              onChange={(e) => handleSelectChange(e.target.value)}
              placeholder="Escolha ou digite um residente..."
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
            />
            <datalist id="residentes-lista">
              {residents.map((r) => (
                <option key={r.casela} value={r.casela}>
                  {r.name}
                </option>
              ))}
            </datalist>
          </div>

          {formData.casela && (
            <div className="space-y-5 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Casela
                </label>
                <input
                  type="text"
                  name="casela"
                  value={formData.casela}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ name: "", casela: "" })}
                  className="px-5 py-2 border border-slate-400 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
