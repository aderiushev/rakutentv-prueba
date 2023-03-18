import { api } from '../utils/http'

export const fetchCategory = async (id: string) => {
  return api.get(`/v3/lists/${id}`)
}
