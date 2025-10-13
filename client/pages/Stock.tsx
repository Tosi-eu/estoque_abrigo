import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { medicines } from "../../mocks/medicines";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Estoque() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const stock = useMemo(() => {
    const meds = medicines.map((m) => ({
      type: "Medicamento",
      name: m.name,
      category: m.active || "Medicamento",
      manufacturer: m.manufacturer,
      batch: m.batch,
      expiry: m.expiry,
      dosage: m.dosage || "-",
      form: m.form || "-",
      quantity: m.quantity,
    }));

    const hosp = hospitalItems.map((h) => ({
      type: "Item Hospitalar",
      name: h.name,
      category: h.category || "Hospitalar",
      expiry: h.expiry,
      dosage: h.unit || "-",
      form: h.form || "-",
      quantity: h.quantity,
    }));

    return [...meds, ...hosp];
  }, []);

  const filteredStock = useMemo(() => {
    return stock.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || item.type === category || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [stock, search, category]);

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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Medicamento">Medicamentos</option>
            <option value="Item Hospitalar">Itens Hospitalares</option>
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Itens em Estoque ({filteredStock.length})
          </h2>

          <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-gray-400 bg-gray-200">
                    <th className="px-4 py-3 text-center text-sm font-bold">Tipo</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Nome</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Categoria</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Validade</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Dosagem/Unidade</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Forma</th>
                    <th className="px-4 py-3 text-center text-sm font-bold">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-xs">{item.type}</td>
                      <td className="px-4 py-3 text-xs">{item.name}</td>
                      <td className="px-4 py-3 text-xs">{item.category}</td>
                      <td className="px-4 py-3 text-xs">{item.expiry}</td>
                      <td className="px-4 py-3 text-xs">{item.dosage}</td>
                      <td className="px-4 py-3 text-xs">{item.form}</td>
                      <td className="px-4 py-3 text-xs">{item.quantity}</td>
                    </tr>
                  ))}

                  {filteredStock.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-4 text-sm text-gray-600"
                      >
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
