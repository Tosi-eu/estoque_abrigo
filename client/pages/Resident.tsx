import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { residents } from "../../mocks/residents";

export default function Resident() {

  return (
    <Layout title="Residentes">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/resident/register"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Cadastrar Residente
          </Link>
          <Link
            to="/resident/edit"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Editar Residente
          </Link>
          <Link
            to="/resident/delete"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Excluir Residente
          </Link>
        </div>

        <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Nome</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">Casela</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((r) => (
                  <tr key={r.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-900">{r.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{r.casela}</td>
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
