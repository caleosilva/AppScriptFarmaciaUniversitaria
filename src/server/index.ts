import {
  onOpen,
  openDialogBootstrap,
} from './ui';

import { getSheetsData, addSheet, deleteSheet, setActiveSheet, doGet, getMedicamentos, getInformacoesMedicamentos, appendRowMedicamentos} from './sheets';

// Public functions must be exported as named exports
export {
  doGet,
  onOpen,
  openDialogBootstrap,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  getMedicamentos,
  getInformacoesMedicamentos,
  appendRowMedicamentos
};
