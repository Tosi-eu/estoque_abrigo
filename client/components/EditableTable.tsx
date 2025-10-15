import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { EditableTableProps } from "@/interfaces/interfaces";
import { useToast } from "@/hooks/use-toast";

export default function EditableTable({ data, columns, onAdd, onEdit, onDelete }: EditableTableProps) {
  const [rows, setRows] = useState(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { toast } = useToast();

  // Sincroniza rows com os dados externos (filtrados)
  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleAddRow = () => {
    const newRow: Record<string, any> = {};
    columns.forEach((col) => (newRow[col.key] = ""));
    const updated = [...rows, newRow];
    setRows(updated);
    setEditingIndex(updated.length - 1);
    if (onAdd) onAdd(newRow);
  };

  const handleChange = (rowIndex: number, key: string, value: string) => {
    const updated = [...rows];
    updated[rowIndex][key] = value;
    setRows(updated);
  };

  const handleSave = (index: number) => {
    const row = rows[index];
    const emptyField = columns.find((col) => col.editable && !row[col.key]);
    if (emptyField) {
      toast({
        title: "Campo obrigatório vazio",
        description: `Preencha o campo "${emptyField.label}" antes de salvar.`,
        variant: "error",
      });
      return;
    }
    setEditingIndex(null);
    if (onEdit) onEdit(row, index);
  };

  const handleDelete = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    if (onDelete) onDelete(index);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-end p-3 border-b border-slate-200 bg-sky-50">
        <span
          onClick={handleAddRow}
          className="flex items-center gap-1 text-sky-700 text-sm font-medium cursor-pointer hover:text-sky-800 transition"
        >
          <Plus size={16} /> Adicionar linha
        </span>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 bg-sky-100">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-sm font-semibold text-slate-800 ${
                    index !== columns.length - 1 ? "border-r border-slate-200" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-200 hover:bg-sky-50 transition-colors"
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map((col, index) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-xs text-slate-800 relative ${
                      index !== columns.length - 1 ? "border-r border-slate-200" : ""
                    }`}
                  >
                    {editingIndex === i && col.editable ? (
                      <input
                        type={col.type || "text"}
                        value={row[col.key]}
                        onChange={(e) => handleChange(i, col.key, e.target.value)}
                        className="border border-slate-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-sky-300 focus:outline-none"
                      />
                    ) : (
                      row[col.key]
                    )}

                    {index === columns.length - 1 && hoveredRow === i && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {editingIndex === i ? (
                          <button
                            onClick={() => handleSave(i)}
                            className="bg-sky-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-sky-700 transition-colors"
                          >
                            Salvar
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingIndex(i)}
                            className="text-sky-700 hover:text-sky-900"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(i)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-sm text-slate-600">
                  Nenhum item cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
