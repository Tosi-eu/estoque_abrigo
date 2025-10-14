import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Equipments() {
  return (
    <Layout title="Equipamentos">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/equipments/register/new"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Registrar Novo Equipamento
          </Link>
          <Link
            to="/equipments/register"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Cadastrar Equipamento
          </Link>
          <Link
            to="/equipments/edit"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Editar Equipamento
          </Link>
          <Link
            to="/equipments/delete"
            className="px-6 py-3 bg-gray-100 border border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200"
          >
            Excluir Equipamento
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
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Quantidade</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Armário</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {hospitalItems.map((item, i) => (
                  <tr key={i} className="border-b border-gray-300 text-center hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{item.cabinet}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{item.description}</td>
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
