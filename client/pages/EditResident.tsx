import { useState } from "react";
import Layout from "@/components/Layout";
import { residents } from "../../mocks/residents";
import Select from "react-select";

export default function EditResident() {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", casela: null });

  const handleSelectChange = (selectedOption: any) => {
    const resident = residents.find((r) => r.casela === selectedOption.value);
    if (resident) {
      setSelectedResident(resident);
      setFormData({ name: resident.name, casela: resident.casela });
    } else {
      setSelectedResident(null);
      setFormData({ name: "", casela: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!selectedResident)
      return alert("Selecione um residente primeiro.");
    alert(`Residente ${formData.name} atualizado com sucesso!`);
  };

  return (
    <Layout title="Editar Residente">
      <div className="max-w-lg mx-auto mt-10 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Edição de Residente
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Selecione o residente
            </label>
            <Select
              options={residents.map((r) => ({
                value: r.casela,
                label: r.name,
              }))}
              placeholder="Escolha um residente..."
              onChange={handleSelectChange}
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "#38bdf8" : "#cbd5e1",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(56,189,248,0.3)"
                    : "none",
                  "&:hover": { borderColor: "#94a3b8" },
                  borderRadius: "0.5rem",
                  padding: "2px 4px",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#94a3b8",
                }),
              }}
            />
          </div>

          {selectedResident && (
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
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
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
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedResident(null);
                    setFormData({ name: "", casela: "" });
                  }}
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
