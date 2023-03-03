import { api } from "..";
import { SelectOption } from "../../context/types";

export const TableService = {
    getActiveCells: () => api.get<SelectOption[]>('')
}