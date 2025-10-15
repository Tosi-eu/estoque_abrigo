import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { transactions } from "../../mocks/transactions";

export default function Transactions() {
  const columns = [
    { key: "medicineName", label: "Medicamento", editable: false },
    { key: "transactionType", label: "Tipo", editable: false },
    { key: "operatorName", label: "Operador", editable: false },
    { key: "casela", label: "Casela", editable: false },
    { key: "quantity", label: "Quantidade", editable: false },
    { key: "patientName", label: "Paciente", editable: false },
    { key: "transactionDate", label: "Data", editable: false },
  ];

  return (
    <Layout title="Movimentações de Estoque">
      <EditableTable data={transactions} columns={columns} />
    </Layout>
  );
}