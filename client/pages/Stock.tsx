import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import EditableTable from "@/components/EditableTable";
import { StockType } from "@/enums/enums";
import { medicines } from "../../mocks/medicines";
import { cabinets } from "../../mocks/cabinets";
import { equipments } from "../../mocks/equipments";
import { medicineInventory, equipmentInventory } from "../../mocks/stock";
import { useNavigate } from "react-router-dom";

export default function Stock() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    expiry: "",
    quantity: "",
    patient: "",
    cabinet: "",
    casela: "",
    stockType: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const items = useMemo(() => {
    const meds = medicineInventory.map((entry) => {
      const med = medicines.find((m) => m.id === entry.medicineId);
      const cabinet = cabinets.find((c) => c.id === entry.cabinetId);

      return {
        type: "Medicamento",
        name: med?.name || "-",
        description: med?.substance || "-",
        expiry: entry.expiry,
        quantity: entry.quantity,
        minimumStock: med?.minimumStock,
        patient: entry.residentId ? `Residente ${entry.residentId}` : "-",
        cabinet: cabinet?.description || "-",
        casela: entry.residentId || "-",
        stockType:
          entry.origin === "individual"
            ? StockType.INDIVIDUAL
            : StockType.GERAL,
      };
    });

    const eqs = equipmentInventory.map((entry) => {
      const eq = equipments.find((e) => e.id === entry.equipmentId);
      const cabinet = cabinets.find((c) => c.id === entry.cabinetId);

      return {
        type: "Equipamento",
        name: eq?.name || "-",
        description: eq?.description || "-",
        expiry: "-",
        quantity: entry.quantity,
        patient: "-",
        cabinet: cabinet?.description || "-",
        casela: "-",
        stockType: StockType.GERAL,
      };
    });

    return [...meds, ...eqs];
  }, []);

  const filteredStock = useMemo(() => {
    return items.filter((item) => {
      const term = search.toLowerCase();
      if (search && !item.name.toLowerCase().includes(term)) return false;

      for (const key in filters) {
        const val = (filters as any)[key];
        if (
          val &&
          String(item[key]).toLowerCase() !== String(val).toLowerCase()
        ) {
          return false;
        }
      }

      return true;
    });
  }, [items, search, filters]);

  const columns = [
    { key: "type", label: "Tipo", editable: false },
    { key: "name", label: "Nome", editable: true },
    {
      key: "description",
      label: "Descrição / Princípio Ativo",
      editable: true,
    },
    { key: "expiry", label: "Validade", editable: true },
    { key: "quantity", label: "Quantidade", editable: true },
    { key: "stockType", label: "Tipo de Estoque", editable: false },
    { key: "patient", label: "Residente", editable: false },
    { key: "cabinet", label: "Armário", editable: false },
    { key: "casela", label: "Casela", editable: false },
  ];

  const uniqueValues = (key: string) =>
    [...new Set(items.map((i) => i[key]))].filter((v) => v && v !== "-");

  return (
    <Layout title="Estoque de Medicamentos e Equipamentos">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/stock/in")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Entrada de Estoque
          </button>

          <button
            onClick={() => navigate("/stock/out")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Saída de Estoque
          </button>

          <button className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">
            Gerar Relatório
          </button>
        </div>

        <div className="flex flex-wrap gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <select
            value={filters.stockType}
            onChange={(e) => handleFilterChange("stockType", e.target.value)}
            className="px-3 py-2 bg-white border rounded-lg text-sm"
          >
            <option value="">Todos os tipos</option>
            <option value={StockType.GERAL}>Geral</option>
            <option value={StockType.INDIVIDUAL}>Individual</option>
          </select>

          <input
            placeholder="Nome"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            list="names"
            className="px-3 py-2 border rounded-lg text-sm"
          />
          <datalist id="names">
            {uniqueValues("name").map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            placeholder="Residente"
            value={filters.patient}
            onChange={(e) => handleFilterChange("patient", e.target.value)}
            list="patients"
            className="px-3 py-2 border rounded-lg text-sm"
          />
          <datalist id="patients">
            {uniqueValues("patient").map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            placeholder="Armário"
            value={filters.cabinet}
            onChange={(e) => handleFilterChange("cabinet", e.target.value)}
            list="cabinets"
            className="px-3 py-2 border rounded-lg text-sm"
          />
          <datalist id="cabinets">
            {uniqueValues("cabinet").map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>

          <input
            placeholder="Casela"
            value={filters.casela}
            onChange={(e) => handleFilterChange("casela", e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <EditableTable
          data={filteredStock}
          columns={columns}
          onEdit={(row, i) => console.log("Editado:", row, "linha", i)}
          onDelete={(i) => console.log("Excluído linha:", i)}
          onAdd={(row) => console.log("Nova linha:", row)}
        />
      </div>
    </Layout>
  );
}
