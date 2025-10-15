// pages/Estoque.tsx
import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import EditableTable from "@/components/EditableTable";
import { medicines } from "../../mocks/medicines";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Estoque() {
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("all");

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
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.manufacturer.toLowerCase().includes(searchTerm);

      const matchesDescription =
        description === "all" ||
        (description === "Medicamento" && item.type === "Medicamento") ||
        (description === "Equipamento" && item.type === "Equipamento");

      return matchesSearch && matchesDescription;
    });
  }, [stock, search, description]);

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
      <div className="space-y-8">
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Gerar Relatório
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 border border-gray-300 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Buscar por nome, categoria ou fabricante..."
            className="w-full md:w-1/2 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Medicamento">Medicamentos</option>
            <option value="Equipamento">Itens Hospitalares</option>
          </select>
        </div>

        <EditableTable data={filteredStock} columns={columns} />
      </div>
    </Layout>
  );
}