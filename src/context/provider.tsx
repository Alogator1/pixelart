import React, { PropsWithChildren, useCallback } from 'react';
import { TableContext } from './context';
import { TableService } from '../api/table/service';
import { HoveredCell, SelectOption } from './types';

export function TableProvider(props: PropsWithChildren<{}>) {

    const [activeMode, setActiveMode] = React.useState<SelectOption | null>(null);
    const [modes, setModes] = React.useState<SelectOption[]>([]);
    const [activeCells, setActiveCells] = React.useState<HoveredCell[]>([]);

    const apiGetActiveMods = useCallback(async () => {
        const response = await TableService.getActiveCells();

        if (response.data) {
            setModes(response.data);
        }
    }, []
    );

    const changeActiveCell = (cell: HoveredCell) => {
        const cellIndex = activeCells.findIndex((activeCell) => activeCell?.id === cell?.id);
        const cells = [...activeCells];
        if (cellIndex === -1) {
            setActiveCells([...cells, cell]);

            return;
        } else {
            cells.splice(cellIndex, 1);

            setActiveCells(cells);
        }
    }

    const emptyCells = () => {
        setActiveCells([]);
    }

    return (
        <TableContext.Provider value={{
            activeMode,
            modes,
            apiGetActiveMods,
            changeActiveCell,
            activeCells,
            setActiveMode,
            emptyCells
        }}>
            {props.children}
        </TableContext.Provider>
    );
};