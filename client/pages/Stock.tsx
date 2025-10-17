import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import EditableTable from "@/components/EditableTable";
import { stock } from "../../mocks/stock";
import { hospitalItems } from "../../mocks/hospitalItems";
import { medicines } from "../../mocks/medicines";

export default function Stock() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    expiry: "",
    form: "",
    quantity: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const items = useMemo(() => {
    const meds = stock.map((entry) => {
      const med = medicines.find((m) => m.name === entry.medicine.name);
      return {
        type: "Medicamento",
        name: med?.name || entry.medicine.name,
        description: med?.active || "-",
        form: med?.form || "-",
        expiry: entry.expiry,
        quantity: entry.quantity,
      };
    });

    const hosp = hospitalItems.map((h) => ({
      type: "Equipamento",
      name: h.name,
      description: h.description || "Hospitalar",
      form: "-",
      expiry: "-",
      quantity: h.quantity,
    }));

    return [...meds, ...hosp];
  }, []);

  const filteredStock = useMemo(() => {
    return items.filter((item) => {
      const term = search.toLowerCase();
      if (search && !item.name.toLowerCase().includes(term)) return false;

      if (filters.name && item.name !== filters.name) return false;
      if (filters.description && item.description !== filters.description) return false;
      if (filters.expiry && item.expiry !== filters.expiry) return false;
      if (filters.form && item.form !== filters.form) return false;
      if (filters.quantity && item.quantity !== Number(filters.quantity)) return false;

      return true;
    });
  }, [items, search, filters]);

  const columns = [
    { key: "name", label: "Nome", editable: true },
    {
      key: "description",
      label: "Descrição / Princípio Ativo",
      editable: true,
      render: (row: any) => (row.expiry == null ? "Descrição" : "Princípio Ativo"),
    },
    { key: "expiry", label: "Validade", editable: true },
    { key: "form", label: "Forma", editable: true },
    { key: "quantity", label: "Quantidade", editable: true },
  ];

  const uniqueValues = (key: string) =>
    [...new Set(items.map((i) => i[key]))].filter((v) => v && v !== "-");

  return (
    <Layout title="Estoque de Medicamentos e Itens Hospitalares">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">
            Gerar Relatório
          </button>
        </div>

        <div className="flex flex-wrap gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <input
              list="names"
              placeholder="Nome"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="px-3 py-2 border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <datalist id="names">
              {uniqueValues("name").map((v) => (
                <option key={v} value={v} />
              ))}
            </datalist>
          </div>

          <div>
            <input
              list="descriptions"
              placeholder="Descrição / Princípio Ativo"
              value={filters.description}
              onChange={(e) => handleFilterChange("description", e.target.value)}
              className="px-3 py-2 border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <datalist id="descriptions">
              {uniqueValues("description").map((v) => (
                <option key={v} value={v} />
              ))}
            </datalist>
          </div>

          <div>
            <input
              type="date"
              placeholder="Validade"
              value={filters.expiry}
              onChange={(e) => handleFilterChange("expiry", e.target.value)}
              className="px-3 py-2 border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <input
              list="forms"
              placeholder="Forma"
              value={filters.form}
              onChange={(e) => handleFilterChange("form", e.target.value)}
              className="px-3 py-2 border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <datalist id="forms">
              {uniqueValues("form").map((v) => (
                <option key={v} value={v} />
              ))}
            </datalist>
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantidade"
              value={filters.quantity}
              onChange={(e) => handleFilterChange("quantity", e.target.value)}
              className="px-3 py-2 border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
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
