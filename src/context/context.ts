import React from 'react';
import { HoveredCell, SelectOption } from './types';

export type TableContextType = {
  activeMode: SelectOption | null;
  setActiveMode: (mode: SelectOption | null) => void;
  modes: SelectOption[];
  apiGetActiveMods: () => void;
  changeActiveCell: (cell: HoveredCell) => void;
  activeCells: HoveredCell[];
  emptyCells: () => void;
};

export const TableContext = React.createContext<TableContextType>({
  activeMode: null,
  modes: [],
  apiGetActiveMods: () => { },
  changeActiveCell: () => { },
  activeCells: [],
  setActiveMode: () => { },
  emptyCells: () => { },
});