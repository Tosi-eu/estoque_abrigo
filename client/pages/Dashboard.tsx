import Layout from "@/components/Layout";
import { medicines } from "../../mocks/medicines";
import { movements } from "../../mocks/movements";
import { users } from "../../mocks/users";
import { patients } from "../../mocks/patients";
import { cabinets } from "../../mocks/cabinets";
import { StockType } from "@/enums/enums";
import { useMemo } from "react";
import { equipmentInventory, medicineInventory } from "../../mocks/stock";
import { prepareMovements } from "@/utils/utils";
import { equipments } from "../../mocks/equipments";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const daysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.ceil((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24));
};

export default function Dashboard() {
  const today = new Date().toISOString().split("T")[0];

  const expiringMedicines = useMemo(() => {
    return medicineInventory
      .filter((m) => daysBetween(m.expiry, today) <= 60)
      .map((m) => {
        const med = medicines.find((x) => x.id === m.medicineId);
        return {
          name: med?.name || "-",
          substance: med?.substance || "-",
          quantity: m.quantity,
          expiry: m.expiry,
        };
      });
  }, []);

  const recentMovements = useMemo(() => {
    const allMovements = prepareMovements({
      movements,
      medicines,
      equipments,
      patients,
      cabinets,
      users,
      medicineInventory,
      equipmentInventory,
    });

    const todayDate = new Date();
    const twoWeeksAgo = new Date(todayDate);
    twoWeeksAgo.setDate(todayDate.getDate() - 14);

    return allMovements.filter((mov) => {
      const movDate = new Date(mov.movementDate);
      return movDate >= twoWeeksAgo && movDate <= todayDate;
    });
  }, []);

  const stats = useMemo(() => {
    const totalStock = medicineInventory.reduce(
      (acc, m) => acc + m.quantity,
      0,
    );
    const expired = medicineInventory.filter(
      (m) => new Date(m.expiry) < new Date(),
    ).length;
    const belowMin = medicines.filter((m) => {
      const inv = medicineInventory.find((mi) => mi.medicineId === m.id);
      return inv && inv.quantity <= m.minimumStock;
    }).length;

    return [
      { label: "Quantidade total em estoque", value: totalStock.toString() },
      { label: "Medicamentos vencidos", value: expired.toString() },
      { label: "Próximos do estoque mínimo", value: belowMin.toString() },
    ];
  }, []);

  const stockDistribution = useMemo(() => {
    const generalMedicines = medicineInventory
      .filter((m) => m.origin === StockType.GERAL)
      .reduce((acc, m) => acc + m.quantity, 0);

    const individualMedicines = medicineInventory
      .filter((m) => m.origin === StockType.INDIVIDUAL)
      .reduce((acc, m) => acc + m.quantity, 0);

    const equipmentCount = equipmentInventory.reduce(
      (acc, e) => acc + e.quantity,
      0,
    );

    return [
      { name: "Estoque Geral", value: generalMedicines },
      { name: "Estoque Individual", value: individualMedicines },
      { name: "Equipamentos", value: equipmentCount },
    ];
  }, []);

  const COLORS = ["#0EA5E9", "#FACC15", "#EF4444"];

  return (
    <Layout>
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Visão Geral
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center"
                style={{ minHeight: 150 }}
              >
                <div className="text-sm font-medium text-slate-600 mb-2 text-center">
                  {stat.label}
                </div>
                <div className="text-[60px] font-bold text-sky-700 leading-none text-center">
                  {stat.value}
                </div>
              </div>
            ))}
            <div
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col"
              style={{ minHeight: 200 }}
            >
              <h4 className="text-xs font-medium text-slate-600 mb-3 text-center">
                Proporção de Estoque
              </h4>

              <div className="flex items-center justify-center w-full">
                <div className="w-1/2 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockDistribution}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={70}
                        label={false}
                      >
                        {stockDistribution.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          fontSize: 12,
                          borderRadius: 8,
                        }}
                        formatter={(value: number) => [
                          `${value}`,
                          "Quantidade",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-1/2 pl-4 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[0] }}
                    ></span>
                    <span>
                      {stockDistribution[0].name}:{" "}
                      {stockDistribution[0]?.value ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[1] }}
                    ></span>
                    <span>
                      {stockDistribution[1].name}:{" "}
                      {stockDistribution[1]?.value ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[2] }}
                    ></span>
                    <span>
                      {stockDistribution[2].name}:{" "}
                      {stockDistribution[2]?.value ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-sky-50">
              <h3 className="text-base font-semibold text-slate-800 text-center">
                Medicamentos Próximos do Vencimento
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-sky-100">
                    <th className="px-3 py-2 text-center font-semibold text-slate-800">
                      Medicamento
                    </th>
                    <th className="px-3 py-2 text-center font-semibold text-slate-800">
                      Princípio Ativo
                    </th>
                    <th className="px-3 py-2 text-center font-semibold text-slate-800">
                      Quantidade
                    </th>
                    <th className="px-3 py-2 text-center font-semibold text-slate-800">
                      Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expiringMedicines.map((med, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 hover:bg-sky-50 transition-colors"
                    >
                      <td className="px-3 py-2 text-center text-xs text-slate-700">
                        {med.name}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-slate-700">
                        {med.substance}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-slate-700">
                        {med.quantity}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-slate-700">
                        {new Date(med.expiry).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-sky-50">
              <h3 className="text-base font-semibold text-slate-800 text-center">
                Movimentações Recentes
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-sky-100">
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Medicamento
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Tipo
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Operador
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Casela
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Quantidade
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Paciente
                    </th>
                    <th className="px-2 py-2 text-center font-semibold text-slate-800 text-xs">
                      Validade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentMovements.map((mov, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 hover:bg-sky-50 transition-colors"
                    >
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.name}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.type}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.operator}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.casela ?? "-"}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.quantity}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.patient ?? "-"}
                      </td>
                      <td className="px-2 py-2 text-center text-xs text-slate-700">
                        {mov.expiry
                          ? new Date(mov.expiry).toLocaleDateString("pt-BR")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
