import { TransactionType } from "@/enums/enums";
import { ReactNode } from "react";

export interface Column {
  key: string;
  label: string;
  editable?: boolean;
  type?: "text" | "date";
  enum?: string[];
}

export interface EditableTableProps {
  data: Record<string, any>[];
  columns: Column[];
  onAdd?: (newRow: Record<string, any>) => void;
  onEdit?: (updatedRow: Record<string, any>, index: number) => void;
  onDelete?: (index: number) => void;
}

export interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export interface DeletePopUpProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
}

export interface User {
  email: string;
  password: string;
}

export interface Patient {
  casela: number;
  name: string;
}

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  measuremeUnit: string;
  substance: string;
  minimumStock: number;
}

export interface Cabinet {
  id: number;
  category: string;
  description?: string;
}

export interface Equipment {
  id: number;
  name: string;
  description?: string;
}

export interface MedicineInventory {
  id: number;
  medicineId?: number;
  residentId?: number;
  cabinetId: number;
  quantity: number;
  origin: string;
}

export interface EquipmentInventory {
  id: number;
  equipmentId?: number;
  cabinetId: number;
  quantity: number;
}

export interface Movement {
  id: number;
  type: TransactionType;
  date: string;
  userId: number;
  medicineId?: number;
  equipmentId?: number;
  cabinetId?: number;
  patientId?: number;
}