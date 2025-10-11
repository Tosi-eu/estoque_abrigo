import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

export default function Estoque() {
  return (
    <Layout title="Estoque">
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Gerenciamento de Estoque
        </h2>
        <p className="text-gray-600 mb-6">
          Continue interagindo para preencher esta página com conteúdo.
        </p>
        <Link
          to="/estoque/entrada"
          className="inline-block px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
        >
          Registrar Entrada
        </Link>
      </div>
    </Layout>
  );
}
