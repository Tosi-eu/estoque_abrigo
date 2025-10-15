import Layout from "@/components/Layout";
import { residents } from "../../mocks/residents";
import EditableTable from "@/components/EditableTable";

export default function Resident() {
  const columns = [
    { key: "name", label: "Nome", editable: true },
    { key: "casela", label: "Casela", editable: true },
  ];

  return (
    <Layout title="Residentes">
      <EditableTable data={residents} columns={columns} />
    </Layout>
  );
}