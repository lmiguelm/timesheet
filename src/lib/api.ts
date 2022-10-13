import axios from 'axios';

import { Environments } from '../config/environments';

export const api = axios.create({
  baseURL: Environments.application.baseURL,
});
