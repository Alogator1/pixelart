import axios from "axios";
import { SelectOption } from "./types";

const BASE_URL = 'https://demo7919674.mockable.io'

export const api = axios.create({baseURL: BASE_URL});

export const TableService = {
    getActiveCells: () => api.get<SelectOption[]>('')
}