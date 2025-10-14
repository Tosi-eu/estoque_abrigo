import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { medicines } from "../../mocks/medicines";

export default function Medicines() {
  return (
    <Layout title="Medicamentos">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/medicines/register/new"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Registrar Novo Medicamento
          </Link>
          <Link
            to="/medicines/register"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Cadastrar Medicamento
          </Link>
          <Link
            to="/medicines/edit"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Editar Medicamento
          </Link>
          <Link
            to="/medicines/delete"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Excluir Medicamento
          </Link>
          <button className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200">
            Gerar Relatório
          </button>
        </div>
        <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Nome</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Princípio Ativo</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Fabricante</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Validade</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Forma</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((m, i) => (
                  <tr key={i} className="border-b border-gray-300 text-center hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-900">{m.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{m.active}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{m.manufacturer}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{m.expiry}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{m.form}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{m.quantity}</td>
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
