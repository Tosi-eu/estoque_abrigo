import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import EditableTable from "@/components/EditableTable";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Equipments() {
  const columns = [
    { key: "name", label: "Nome", editable: true },
    { key: "quantity", label: "Quantidade", editable: true },
    { key: "cabinet", label: "Armário", editable: true },
    { key: "description", label: "Descrição", editable: true },
  ];

  return (
    <Layout title="Equipamentos">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/equipments/register/new"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors"
          >
            Registrar Novo Equipamento
          </Link>
        </div>

        <EditableTable data={hospitalItems} columns={columns} />
      </div>
    </Layout>
  );
}
