import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

export default function Medicamentos() {
  const medications = [
    {
      name: "Paracetamol 500mg",
      active: "Paracetamol",
      manufacturer: "Farmaceutica X",
      batch: "A12345",
      expiry: "2025-08-10",
      dosage: "500mg",
      form: "Comprimido",
      quantity: 50,
    },
    {
      name: "Amoxicilina 250mg",
      active: "Amoxicilina",
      manufacturer: "Laboratório Y",
      batch: "B67890",
      expiry: "2025-09-01",
      dosage: "250mg",
      form: "Cápsula",
      quantity: 30,
    },
    {
      name: "Ibuprofeno 400mg",
      active: "Ibuprofeno",
      manufacturer: "Farmacêutica Z",
      batch: "C23456",
      expiry: "2025-07-20",
      dosage: "400mg",
      form: "Comprimido",
      quantity: 40,
    },
    {
      name: "Dipirona 500mg",
      active: "Dipirona",
      manufacturer: "Laboratório A",
      batch: "D78901",
      expiry: "2025-08-15",
      dosage: "500mg",
      form: "Comprimido",
      quantity: 60,
    },
    {
      name: "Lorazepam 2mg",
      active: "Lorazepam",
      manufacturer: "Farmacêutica B",
      batch: "E34567",
      expiry: "2025-10-05",
      dosage: "2mg",
      form: "Comprimido",
      quantity: 25,
    },
  ];

  return (
    <Layout title="Medicamentos">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/medicamentos/cadastrar"
            className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Cadastrar Medicamento
          </Link>
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Editar Medicamento
          </button>
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Remover Medicamento
          </button>
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Registrar Saída
          </button>
          <button className="px-6 py-3 bg-gray-100 border-[1.5px] border-gray-700 rounded text-base font-bold text-gray-900 hover:bg-gray-200 transition-colors">
            Gerar Relatório
          </button>
        </div>

        {/* Medications Table */}
        <div className="bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Princípio Ativo
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Fabricante
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Lote
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Validade
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Dosagem
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Forma
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Quantidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.name}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.active}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.manufacturer}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.batch}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.expiry}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.dosage}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.form}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {med.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
