import { medicines } from "./medicines";

export const stock = [
  {
    id: 1,
    medicine: medicines[0],
    expiry: "2025-11-20",
    quantity: 60,
    patientName: "Maria Oliveira",
    casela: 101,
    cabinet: 1,
    stockType: "individual",
  },
  {
    id: 2,
    medicine: medicines[0],
    expiry: "2026-02-15",
    quantity: 120,
    cabinet: 4,
    stockType: "geral",
  },
  {
    id: 3,
    medicine: medicines[1],
    expiry: "2025-09-10",
    quantity: 80,
    patientName: "Carlos Pereira",
    casela: 102,
    cabinet: 2,
    stockType: "individual",
  },
  {
    id: 4,
    medicine: medicines[2],
    expiry: "2026-06-10",
    quantity: 50,
    cabinet: 4,
    stockType: "geral",
  },
  {
    id: 5,
    medicine: medicines[2],
    expiry: "2027-03-25",
    quantity: 30,
    cabinet: 4,
    stockType: "geral",
  },
];
