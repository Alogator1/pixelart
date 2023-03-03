import React, { useContext, useEffect } from 'react';
import { TableContext } from '../../context/context';
import './styles.css';

export const Table = () => {

    const { activeMode, activeCells, changeActiveCell } = useContext(TableContext);

    const [rowsAndColumns, setRowsAndColumns] = React.useState<Array<null>>([]);

    useEffect(() => {
        setRowsAndColumns(Array.from({ length: activeMode?.field || 0 }));
    }, [activeMode]);

    const onCellHover = (cellKey: string) => {
        changeActiveCell(cellKey);
    }

    const isCellActive = (cellKey: string) => {
        return activeCells.includes(cellKey);
    }

    const getRowAndColumn = (cellKey: string) => {
        const [row, column] = cellKey.split('-');

        return `Row: ${+row + 1}, Column: ${+column + 1}`;
    }

    return (
        <div className='tableWrapper'>
            <div>
                <table>
                    <tbody>
                        {rowsAndColumns.map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {rowsAndColumns.map((_, columnIndex) => (
                                    <td onMouseOver={() => {
                                        onCellHover(`${rowIndex}-${columnIndex}`)
                                    }
                                    } key={`${rowIndex}-${columnIndex}`} className={isCellActive(`${rowIndex}-${columnIndex}`) ? 'activeCell' : ''} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {activeCells?.length > 0 &&
                <div className='hoveredWrapper'>
                    <span>Hovered squares:</span>
                    <ul>
                        {activeCells.map((cell) => (
                            <li key={cell}>{getRowAndColumn(cell)}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}