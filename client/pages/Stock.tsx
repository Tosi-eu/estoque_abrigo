import Layout from "@/components/Layout";
import EditableTable from "@/components/EditableTable";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StockType } from "@/enums/enums";
import { medicines } from "../../mocks/medicines";
import { cabinets } from "../../mocks/cabinets";
import { equipments } from "../../mocks/equipments";
import { medicineInventory, equipmentInventory } from "../../mocks/stock";

interface StockItem {
  type: "Medicamento" | "Equipamento";
  name: string;
  description: string;
  expiry: string;
  quantity: number;
  minimumStock?: number;
  patient?: string;
  cabinet?: string;
  casela?: string | number;
  stockType: StockType;
}

export default function Stock() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterType = (location.state as any)?.filterType;

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

  const items: StockItem[] = useMemo(() => {
    const meds: StockItem[] = medicineInventory.map((entry) => {
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

    const eqs: StockItem[] = equipmentInventory.map((entry) => {
      const eq = equipments.find((e) => e.id === entry.equipmentId);
      const cabinet = cabinets.find((c) => c.id === entry.cabinetId);

      return {
        type: "Equipamento",
        name: eq?.name || "-",
        description: eq?.description || "-",
        expiry: "-", 
        quantity: entry.quantity,
        stockType: StockType.GERAL,
        patient: "-",
        cabinet: cabinet?.description || "-",
        casela: "-",
      };
    });

    return [...meds, ...eqs];
  }, []);

  useEffect(() => {
    if (filterType === "expired") {
      setFilters((prev) => ({ ...prev, expiry: "expired" }));
    } else if (filterType === "belowMin") {
      setFilters((prev) => ({ ...prev, expiry: "belowMin" }));
    }
  }, [filterType]);

  const filteredStock = useMemo(() => {
    let filtered = [...items];

    if (filters.expiry === "expired") {
      filtered = filtered.filter(
        (item) =>
          item.type === "Medicamento" &&
          new Date(item.expiry) < new Date()
      );
    } else if (filters.expiry === "belowMin") {
      filtered = filtered.filter(
        (item) =>
          item.type === "Medicamento" &&
          item.minimumStock !== undefined &&
          item.quantity <= item.minimumStock
      );
    }

    const term = search.toLowerCase();
    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
    }

    for (const key in filters) {
      const val = (filters as any)[key];
      if (val && !["expired", "belowMin"].includes(val)) {
        filtered = filtered.filter((item) =>
          String(item[key as keyof StockItem] || "")
            .toLowerCase()
            .includes(String(val).toLowerCase())
        );
      }
    }

    return filtered;
  }, [items, search, filters]);

  const columns = [
    { key: "type", label: "Tipo", editable: false },
    { key: "name", label: "Nome", editable: true },
    { key: "description", label: "Descrição / Princípio Ativo", editable: true },
    { key: "expiry", label: "Validade", editable: true },
    { key: "quantity", label: "Quantidade", editable: true },
    { key: "stockType", label: "Tipo de Estoque", editable: false },
    { key: "patient", label: "Residente", editable: false },
    { key: "cabinet", label: "Armário", editable: false },
    { key: "casela", label: "Casela", editable: false },
  ];

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
