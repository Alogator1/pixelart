import React, { useContext, useEffect } from 'react';
import { TableContext } from '../../context/context';
import { HoveredCell } from '../../context/types';
import styles from './styles.module.css';

export const Table = () => {

    const { activeMode, activeCells, changeActiveCell } = useContext(TableContext);

    const [rowsAndColumns, setRowsAndColumns] = React.useState<Array<null>>([]);

    useEffect(() => {
        setRowsAndColumns(Array.from({ length: activeMode?.field || 0 }));
    }, [activeMode]);

    const onCellHover = (cell: HoveredCell) => {
        changeActiveCell(cell);
    }

    const isCellActive = (cellKey: string) => {
        return activeCells.find((cell) => {
            return cell?.id === cellKey;
        });
    }

    return (
        <div className={styles.tableWrapper}>
            <div>
                <table>
                    <tbody>
                        {rowsAndColumns.map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {rowsAndColumns.map((_, columnIndex) => (
                                    <td onMouseOver={() => {
                                        onCellHover({row: rowIndex, column: columnIndex, id:`${rowIndex}-${columnIndex}`})
                                    }
                                    } key={`${rowIndex}-${columnIndex}`} className={isCellActive(`${rowIndex}-${columnIndex}`) ? styles.activeCell : ''} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {activeCells?.length > 0 &&
                <div className={styles.hoveredWrapper}>
                    <span>Hovered squares:</span>
                    <ul>
                        {activeCells.map((cell) => (
                            <li key={cell?.id}>{`Row: ${+cell?.row + 1}, Column: ${+cell?.column + 1}`}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}