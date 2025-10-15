import Layout from "@/components/Layout";
import { stats } from "../../mocks/stats";
import { expiringMedicines } from "../../mocks/expiringMedicines";
import { recentMovements } from "../../mocks/recentMovements";

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-10">
        <div>
          <h1 className="text-[28px] font-semibold text-slate-800 mb-6">
            Painel de Controle
          </h1>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Visão Geral
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="text-sm font-medium text-slate-600 mb-1">
                  {stat.label}
                </div>
                <div className="text-[60px] font-bold text-sky-700 leading-none">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-sky-50">
              <h3 className="text-base font-semibold text-slate-800">
                Medicamentos Próximos do Estoque Mínimo
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-sky-100">
                    <th className="px-3 py-2 text-left font-semibold text-slate-800">
                      Medicamento
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-800">
                      Princípio Ativo
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-800">
                      Quantidade
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-800">
                      Data de Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expiringMedicines.map((med, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-sky-50 transition-colors"
                    >
                      <td className="px-3 py-2 text-xs text-slate-700">{med.name}</td>
                      <td className="px-3 py-2 text-xs text-slate-700">{med.active}</td>
                      <td className="px-3 py-2 text-xs text-slate-700">{med.quantity}</td>
                      <td className="px-3 py-2 text-xs text-slate-700">{med.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-sky-50">
              <h3 className="text-base font-semibold text-slate-800">
                Movimentações Recentes de Estoque
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-sky-100">
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Medicamento
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Tipo Movimentação
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Operador
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Casela
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Quantidade
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Paciente
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-slate-800 text-xs">
                      Data de Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentMovements.map((mov, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-sky-50 transition-colors"
                    >
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.medication}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.type}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.operator}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.box}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.quantity}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.patient}</td>
                      <td className="px-2 py-2 text-xs text-slate-700">{mov.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
