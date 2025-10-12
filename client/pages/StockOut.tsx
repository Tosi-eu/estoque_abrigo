import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockOut() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicamento: "",
    quantidade: "",
    paciente: "",
    casela: "",
    autorizadoPor: "",
    retiradoPor: "",
    dataSaida: "",
    horaSaida: "",
    setor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Saída registrada com sucesso!",
        description: "O medicamento foi retirado do estoque.",
        variant: "success",
      });
    navigate("/stock");
  };

  return (
    <Layout title="Saída de Estoque">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-300 shadow-sm space-y-6"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Saída de Estoque
        </h2>

        {/* Campos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medicamento
            </label>
            <input
              type="text"
              name="medicamento"
              value={formData.medicamento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Digite o nome do medicamento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Residente/Paciente
            </label>
            <input
              type="text"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Nome do paciente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Casela
            </label>
            <input
              type="text"
              name="casela"
              value={formData.casela}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Autorizado por (Profissional)
            </label>
            <input
              type="text"
              name="autorizadoPor"
              value={formData.autorizadoPor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Retirado por (Responsável)
            </label>
            <input
              type="text"
              name="retiradoPor"
              value={formData.retiradoPor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data da saída
              </label>
              <input
                type="date"
                name="dataSaida"
                value={formData.dataSaida}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora da saída
              </label>
              <input
                type="time"
                name="horaSaida"
                value={formData.horaSaida}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Setor
              </label>
              <input
                type="text"
                name="setor"
                value={formData.setor}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/stock")}
            className="px-6 py-2 bg-gray-100 border border-gray-400 rounded-lg font-semibold hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900"
          >
            Registrar saída
          </button>
        </div>
      </form>
    </Layout>
  );
}
