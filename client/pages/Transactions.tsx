import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { movements } from "../../mocks/movements";
import { equipments } from "../../mocks/equipments";
import { cabinets } from "../../mocks/cabinets";
import { users } from "../../mocks/users";
import { equipmentInventory, medicineInventory } from "../../mocks/stock";
import { prepareMovements } from "@/utils/utils";
import { medicines } from "../../mocks/medicines";

export default function EquipmentMovements() {
  const columns = [
    { key: "movementType", label: "Tipo", editable: false },
    { key: "name", label: "Nome do Produto", editable: false },
    { key: "description", label: "Descrição", editable: false },
    { key: "quantity", label: "Quantidade", editable: false },
    { key: "cabinet", label: "Armário", editable: false },
    { key: "operator", label: "Operador", editable: false },
    { key: "movementDate", label: "Data", editable: false },
  ];

  return (
    <Layout title="Movimentações">
      <div className="space-y-6">
        <EditableTable
          data={prepareMovements({
            movements,
            medicines,
            equipments,
            patients: [],
            cabinets,
            users,
            medicineInventory,
            equipmentInventory,
          })}
          columns={columns}
          entityType="transactions"
        />
      </div>
    </Layout>
  );
}
