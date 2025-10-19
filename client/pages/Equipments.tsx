import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { equipments } from "../../mocks/equipments";

export default function Equipments() {
  const columns = [
    { key: "name", label: "Nome", editable: true },
    { key: "description", label: "Descrição", editable: true },
  ];

  return (
    <Layout title="Equipamentos">
      <div className="space-y-6">
        <EditableTable
          data={equipments}
          columns={columns}
          entityType="equipments"
        />
      </div>
    </Layout>
  );
}
