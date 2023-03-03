import React, { useContext, useEffect } from "react";
import { TableContext } from "../../context/context";
import { SelectOption } from "../../context/types";
import './styles.css'

export const Header = () => {
    const {apiGetActiveMods, modes, setActiveMode, emptyCells} = useContext(TableContext);

    const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(null);

    useEffect(() => {
        apiGetActiveMods();
    }, [apiGetActiveMods]);

    const onOptionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(!e.target.value) {
            setSelectedOption(null);
            
            return;
        };

        setSelectedOption({
            name: e.target.selectedOptions[0].text,
            field: +e.target.value
        })
    }

    const onStartButtonClick = () => {
        emptyCells();

        if(!selectedOption) {
            setActiveMode(null);

            return;
        }

        setActiveMode(selectedOption);
    }
    
    return (
        <div className="headerWrapper">
            <select onChange={onOptionsChange}>
                <option value={''}>Select mode...</option>
                
                {modes.map((mode) => (
                    <option key={mode.name} value={mode.field}>{mode.name}</option>
                ))}
            </select>

            <button onClick={onStartButtonClick}>Start</button>
        </div>
    )
}