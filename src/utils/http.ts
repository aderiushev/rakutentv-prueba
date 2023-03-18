import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gizmo.rakuten.tv',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    classification_id: 5,
    device_identifier: 'web',
    locale: 'es',
    market_code: 'es',
  },
})
