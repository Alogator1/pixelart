import React, { PropsWithChildren, useCallback, useMemo } from 'react';
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

    const changeActiveCell = useCallback((cell: HoveredCell) => {
        setActiveCells((activeCells) => {
            const cellIndex = activeCells.findIndex((activeCell) => activeCell?.id === cell?.id);
            const cells = [...activeCells];
            if (cellIndex < 0) {
                return [...cells, cell];
            } else {
                cells.splice(cellIndex, 1);
                return cells;
            }
        })
    }, [])

    const emptyCells = useCallback(() => {
        setActiveCells([]);
    }, [])

    const value = useMemo(() => ({
        activeMode,
        modes,
        apiGetActiveMods,
        changeActiveCell,
        activeCells,
        setActiveMode,
        emptyCells
    }), [activeMode, modes, apiGetActiveMods, changeActiveCell, activeCells, setActiveMode, emptyCells])

    return (
        <TableContext.Provider value={value}>
            {props.children}
        </TableContext.Provider>
    );
};