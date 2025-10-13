import Layout from "@/components/Layout";
import { transactions } from "../../mocks/transactions";

export default function Transactions() {
  return (
    <Layout title="Movimentações de Estoque">
      <div className="space-y-6">

        <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Medicamento</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Tipo</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Operador</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Casela</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Quantidade</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Paciente</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b border-gray-300 text-center hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-900">{t.medicineName}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.transactionType}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.operatorName}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.casela}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.quantity}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.patientName}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{t.transactionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
