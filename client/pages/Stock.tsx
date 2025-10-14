import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { medicines } from "../../mocks/medicines";
import { hospitalItems } from "../../mocks/hospitalItems";

export default function Estoque() {
  const [search, setSearch] = useState("");
  const [description, setdescription] = useState("all");

  const stock = useMemo(() => {
    const meds = medicines.map((m) => ({
      type: "Medicamento",
      name: m.name,
      description: m.active || "Medicamento",
      manufacturer: m.manufacturer,
      expiry: m.expiry,
      dosage: m.dosage || "-",
      form: m.form || "-",
      quantity: m.quantity,
    }));

    const hosp = hospitalItems.map((h) => ({
      type: "Equipamento",
      name: h.name,
      description: h.description || "Hospitalar",
      manufacturer: "-",
      expiry: "-",
      dosage: "-",
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

      const matchesdescription =
        description === "all" ||
        (description === "Medicamento" && item.type === "Medicamento") ||
        (description === "Equipamento" && item.type === "Equipamento");

      return matchesSearch && matchesdescription;
    });
  }, [stock, search, description]);

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
            onChange={(e) => setdescription(e.target.value)}
            className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Medicamento">Medicamentos</option>
            <option value="Equipamento">Itens Hospitalares</option>
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
                    <th className="px-4 py-3 text-sm font-bold">Tipo</th>
                    <th className="px-4 py-3 text-sm font-bold">Nome</th>
                    <th className="px-4 py-3 text-sm font-bold">Categoria</th>
                    <th className="px-4 py-3 text-sm font-bold">Fabricante</th>
                    <th className="px-4 py-3 text-sm font-bold">Validade</th>
                    <th className="px-4 py-3 text-sm font-bold">Dosagem/Forma</th>
                    <th className="px-4 py-3 text-sm font-bold">Quantidade</th>
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
                      <td className="px-4 py-3 text-xs">{item.description}</td>
                      <td className="px-4 py-3 text-xs">{item.manufacturer}</td>
                      <td className="px-4 py-3 text-xs">{item.expiry}</td>
                      <td className="px-4 py-3 text-xs">
                        {item.dosage} {item.form !== "-" ? `(${item.form})` : ""}
                      </td>
                      <td className="px-4 py-3 text-xs">{item.quantity}</td>
                    </tr>
                  ))}

                  {filteredStock.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
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