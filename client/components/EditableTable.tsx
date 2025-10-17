import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { EditableTableProps } from "@/interfaces/interfaces";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function EditableTable({ data, columns, onAdd, onEdit, onDelete }: EditableTableProps) {
  const [rows, setRows] = useState(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => setRows(data), [data]);

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

  const confirmDelete = (index: number) => setDeleteIndex(index);

  const handleDeleteConfirmed = () => {
    if (deleteIndex === null) return;
    const updated = rows.filter((_, i) => i !== deleteIndex);
    setRows(updated);
    if (onDelete) onDelete(deleteIndex);
    setDeleteIndex(null);
  };

  const handleDeleteCancel = () => setDeleteIndex(null);

  const renderExpiryTag = (value: string) => {
    if (!value) return "-";
    const today = new Date();
    const expiryDate = new Date(value);
    if (isNaN(expiryDate.getTime())) return value;

    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let label = "";
    let tooltipText = "";
    let colorClasses = "";

    if (diffDays < 0) {
      label = "ESPIRADO";
      tooltipText = `Vencido há ${Math.abs(diffDays)} dias`;
      colorClasses = "bg-red-100 text-red-700 border border-red-300";
    } else if (diffDays <= 30) {
      label = "VENCE";
      tooltipText = `Vencerá em ${diffDays} dias`;
      colorClasses = "bg-orange-100 text-orange-700 border border-orange-300";
    } else if (diffDays <= 60) {
      label = "EN";
      tooltipText = `Vencerá em ${diffDays} dias`;
      colorClasses = "bg-yellow-100 text-yellow-700 border border-yellow-300";
    } else {
      label = "OK";
      tooltipText = `Vence em ${diffDays} dias`;
      colorClasses = "bg-green-100 text-green-700 border border-green-300";
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium cursor-default ${colorClasses}`}
            >
              {expiryDate.toLocaleDateString("pt-BR")}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {tooltipText} ({label})
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
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
                      className={`px-4 py-3 text-xs text-slate-800 relative overflow-visible ${
                        index !== columns.length - 1 ? "border-r border-slate-200" : ""
                      }`}
                    >
                      {editingIndex === i && col.editable ? (
                        <div className="flex justify-center items-center">
                          <input
                            type="text"
                            value={row[col.key]}
                            onChange={(e) => handleChange(i, col.key, e.target.value)}
                            className="border border-slate-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-sky-300 focus:outline-none bg-white transition-all text-center"
                          />
                        </div>
                      ) : col.key === "expiry" ? (
                        renderExpiryTag(row[col.key])
                      ) : (
                        row[col.key]
                      )}

                      {index === columns.length - 1 && hoveredRow === i && (
                        <div
                          className="absolute flex items-center gap-3 px-2"
                          style={{
                            right: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {editingIndex === i ? (
                            <button
                              onClick={() => handleSave(i)}
                              className="text-sky-700 font-semibold text-xs hover:text-sky-900 transition-colors"
                            >
                              Salvar
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingIndex(i)}
                              className="text-sky-700 hover:text-sky-900 transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => confirmDelete(i)}
                            className="text-red-600 hover:text-red-800 transition-colors"
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

      <Dialog
        open={deleteIndex !== null}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            padding: 2,
            minWidth: 300,
            fontFamily: "'Inter', sans-serif",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 18 }}>Confirmar exclusão</DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <DialogContentText sx={{ fontSize: 14 }}>
            Tem certeza que deseja remover este item da tabela?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 1 }}>
          <Button onClick={handleDeleteCancel} color="inherit" size="small">
            Não
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" size="small" variant="contained">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
