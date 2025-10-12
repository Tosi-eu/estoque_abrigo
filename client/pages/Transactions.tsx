import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { transactions } from "../../mocks/transactions";

export default function Transactions() {

  return (
    <Layout title="Movimentações">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
        <Link
            to="/medicines/register/new"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Cadastrar Novo Medicamento
          </Link>
          <Link
            to="/medicines/register"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Cadastrar Medicamento
          </Link>
          <Link
            to="/medicines/edit"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Editar Medicamento
          </Link>
          <Link
            to="/medicines/delete"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Excluir Medicamento
          </Link>
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Gerar Relatório
          </button>
        </div>

        <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Tipo Movimentação
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Operador
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Casela
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Quantidade
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Paciente
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Data da Movimentação
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((med, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 text-center hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.medicineName}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.transactionType}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.operatorName }
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.casela}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.quantity}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.patientName}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.transactionDate}
                    </td>
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
