import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import EditableTable from "@/components/EditableTable";
import { medicines } from "../../mocks/medicines";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Stock() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const stock = useMemo(() => {
    const meds = medicines.map((m) => ({
      type: "Medicamento",
      name: m.name,
      description: m.active || "Medicamento",
      manufacturer: m.manufacturer,
      expiry: m.expiry,
      form: m.form || "-",
      quantity: m.quantity,
    }));

    const hosp = hospitalItems.map((h) => ({
      type: "Equipamento",
      name: h.name,
      description: h.description || "Hospitalar",
      manufacturer: "-",
      expiry: "-",
      form: "-",
      quantity: h.quantity,
    }));

    return [...meds, ...hosp];
  }, []);

  const filteredStock = useMemo(() => {
    return stock.filter((item) => {
      const term = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.manufacturer.toLowerCase().includes(term);

      const matchesType =
        typeFilter === "all" ||
        item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [stock, search, typeFilter]);

  const columns = [
    { key: "name", label: "Nome", editable: true },
    { key: "description", label: "Categoria", editable: true },
    { key: "manufacturer", label: "Fabricante", editable: true },
    { key: "expiry", label: "Validade", editable: true },
    { key: "form", label: "Dosagem/Forma", editable: true },
    { key: "quantity", label: "Quantidade", editable: true },
  ];

  return (
    <Layout title="Estoque de Medicamentos e Itens Hospitalares">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">
            Gerar Relatório
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Buscar por nome, categoria ou fabricante..."
            className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Medicamento">Medicamentos</option>
            <option value="Equipamento">Itens Hospitalares</option>
          </select>
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
