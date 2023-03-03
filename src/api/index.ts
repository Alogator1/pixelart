import axios from "axios";

const BASE_URL = 'https://demo7919674.mockable.io'

export const api = axios.create({ baseURL: BASE_URL });