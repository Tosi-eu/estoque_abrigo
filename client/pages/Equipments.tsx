import Layout from "@/components/Layout";
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
        <EditableTable data={hospitalItems} columns={columns} entityType="equipments" />
      </div>
    </Layout>
  );
}
