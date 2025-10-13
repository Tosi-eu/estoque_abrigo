import Layout from "@/components/Layout";
import { stats } from "../../mocks/stats";
import { expiringMedicines } from "../../mocks/expiringMedicines";
import  { recentMovements } from "../../mocks/recentMovements";

export default function Dashboard() {

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 mb-6">
            Painel de Controle
          </h1>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-[1.5px] border-gray-500 rounded-lg p-6"
              >
                <div className="text-sm font-bold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-[72px] font-bold text-gray-900 leading-none">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border-[1.5px] border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-400">
              <h3 className="text-base font-bold text-gray-900">
                Medicamentos Proximos do Estoque Mínimo
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="px-3 py-2 text-left font-bold text-gray-900">
                      Medicamento
                    </th>
                    <th className="px-3 py-2 text-left font-bold text-gray-900">
                      Princípio Ativo
                    </th>
                    <th className="px-3 py-2 text-left font-bold text-gray-900">
                      Quantidade
                    </th>
                    <th className="px-3 py-2 text-left font-bold text-gray-900">
                      Data de Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expiringMedicines.map((med, index) => (
                    <tr
                      key={index}
                      className="bg-warning border-b border-gray-400"
                    >
                      <td className="px-3 py-2 text-xs">{med.name}</td>
                      <td className="px-3 py-2 text-xs">{med.active}</td>
                      <td className="px-3 py-2 text-xs">{med.quantity}</td>
                      <td className="px-3 py-2 text-xs">{med.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-400">
              <h3 className="text-base font-bold text-gray-900">
                Movimentações Recentes de Estoque/Notificar
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Medicamento
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Tipo Movimentação
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Operador
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Casela
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Quantidade
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Paciente
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-900 text-xs">
                      Data de Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentMovements.map((mov, index) => (
                    <tr
                      key={index}
                      className="bg-gray-200 border-b border-gray-400"
                    >
                      <td className="px-2 py-2 text-xs">{mov.medication}</td>
                      <td className="px-2 py-2 text-xs">{mov.type}</td>
                      <td className="px-2 py-2 text-xs">{mov.operator}</td>
                      <td className="px-2 py-2 text-xs">{mov.box}</td>
                      <td className="px-2 py-2 text-xs">{mov.quantity}</td>
                      <td className="px-2 py-2 text-xs">{mov.patient}</td>
                      <td className="px-2 py-2 text-xs">{mov.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
