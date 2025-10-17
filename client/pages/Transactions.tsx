import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { transactions } from "../../mocks/transactions";

export default function Transactions() {
  const columns = [
    { key: "type", label: "Tipo", editable: false },
    { key: "itemName", label: "Nome do Produto", editable: false },
    { key: "transactionType", label: "Movimentação", editable: false },
    { key: "operatorName", label: "Operador", editable: false },
    { key: "casela", label: "Casela", editable: false },
    { key: "quantity", label: "Quantidade", editable: false },
    { key: "patientName", label: "Paciente", editable: false },
    { key: "transactionDate", label: "Data", editable: false },
  ];

  return (
    <Layout title="Movimentações de Estoque">
      <div className="space-y-4">
        <EditableTable data={transactions} columns={columns} />
      </div>
    </Layout>
  );
}
