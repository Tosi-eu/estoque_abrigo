import { MovementRow, PrepareMovementsParams } from "@/interfaces/interfaces";

export function prepareMovements({
  movements,
  medicines,
  equipments,
  patients,
  cabinets,
  users,
  medicineInventory,
  equipmentInventory,
}: PrepareMovementsParams): MovementRow[] {
  return movements
    .map((movement) => {
      const user = users.find((u) => u.email === movement.user);
      const cabinet = cabinets.find((c) => c.id === movement.cabinetId);

      if (movement.medicineId) {
        const med = medicines.find((m) => m.id === movement.medicineId);
        const inventory = medicineInventory.find(
          (inv) =>
            inv.medicineId === movement.medicineId &&
            inv.cabinetId === movement.cabinetId,
        );
        const patient = patients.find((p) => p.casela === movement.patientId);

        return {
          type: "Medicamento",
          name: med?.name || "-",
          description: med?.substance || "-",
          expiry: inventory?.expiry,
          quantity: inventory?.quantity,
          minimumStock: med?.minimumStock,
          stockType: inventory?.origin,
          patient: patient?.name,
          casela: patient?.casela,
          cabinet: cabinet?.id,
          operator: user?.email,
          movementDate: movement.date,
          movementType: movement.type,
          destinationSector: movement.destinationSector,
          originSector: movement.originSector,
        };
      }

      if (movement.equipmentId) {
        const eq = equipments.find((e) => e.id === movement.equipmentId);
        const inventory = equipmentInventory.find(
          (inv) =>
            inv.equipmentId === movement.equipmentId &&
            inv.cabinetId === movement.cabinetId,
        );

        return {
          type: "Equipamento",
          name: eq?.name || "-",
          description: eq?.description || "-",
          quantity: inventory?.quantity,
          cabinet: cabinet?.id,
          operator: user?.email,
          movementDate: movement.date,
          movementType: movement.type,
          destinationSector: movement.destinationSector,
          originSector: movement.originSector,
        };
      }

      return null;
    })
    .filter(Boolean) as MovementRow[];
}
