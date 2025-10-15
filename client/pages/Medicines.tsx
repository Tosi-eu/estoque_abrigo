import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { medicines } from "../../mocks/medicines";

export default function Medicines() {
  return (
    <Layout title="Medicamentos">
      <EditableTable
        data={medicines}
        columns={[
          { key: "name", label: "Nome", editable: true },
          { key: "active", label: "Princípio Ativo", editable: true },
          { key: "manufacturer", label: "Fabricante", editable: true },
          { key: "expiry", label: "Validade", editable: true },
          { key: "form", label: "Forma", editable: true },
          { key: "quantity", label: "Quantidade", editable: true, type: "number" },
        ]}
        onAdd={(row) => console.log("Nova linha:", row)}
        onEdit={(row, i) => console.log("Editado:", row, "na linha", i)}
        onDelete={(i) => console.log("Excluído na linha:", i)}
      />
    </Layout>
  );
}
