import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { EditableTableProps, Column } from "@/interfaces/interfaces";
import { useToast } from "@/hooks/use-toast";

export default function EditableTable({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: EditableTableProps) {
  const [rows, setRows] = useState(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddRow = () => {
    const newRow: Record<string, any> = {};
    columns.forEach((col) => (newRow[col.key] =  "")); 

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
    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex justify-end p-3 border-b border-gray-300 bg-gray-50">
        <span
          onClick={handleAddRow}
          className="flex items-center gap-1 text-black text-sm font-medium cursor-pointer hover:text-gray-700 transition"
        >
          <Plus size={16} /> Adicionar linha
        </span>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-400 bg-gray-200">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-sm font-bold text-gray-900 ${
                    index !== columns.length - 1 ? "border-r border-gray-300" : ""
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
                className="border-b border-gray-300 hover:bg-gray-50 relative"
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map((col, index) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-xs text-gray-900 relative ${
                      index !== columns.length - 1 ? "border-r border-gray-300" : ""
                    }`}
                  >
                    {editingIndex === i && col.editable ? (
                      col.enum ? (
                        <select
                          value={row[col.key]}
                          onChange={(e) => handleChange(i, col.key, e.target.value)}
                          className="border border-gray-400 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                        >
                          {col.enum.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type || "text"}
                          value={row[col.key]}
                          onChange={(e) => handleChange(i, col.key, e.target.value)}
                          className="border border-gray-400 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                          style={{
                            width: `calc(${row[col.key]?.toString().length || 1}ch + 2ch)`,
                            maxWidth: "50%",
                            minWidth: "40px",
                          }}
                          autoFocus={index === columns.findIndex((c) => c.editable)}
                        />
                      )
                    ) : (
                      row[col.key]
                    )}

                    {index === columns.length - 1 && hoveredRow === i && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-50/90 px-1 rounded-md">
                        {editingIndex === i ? (
                          <button
                            onClick={() => handleSave(i)}
                            className="text-green-700 hover:text-green-900 font-semibold text-xs"
                          >
                            Salvar
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingIndex(i)}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(i)}
                          className="text-red-600 hover:text-red-800"
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
                <td colSpan={columns.length} className="text-center py-4 text-sm text-gray-600">
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
