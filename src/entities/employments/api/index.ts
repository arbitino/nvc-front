import type { Database } from '@/shared/types'
import { useApi } from '@/shared/api'
import type { Employments } from '@/entities/employments'

export const fetchEmployments = (database: Database, params = {}) => {
    const api = useApi()
    const endpoint = `/${database.code}/vacancy/employments`

    return api.get<Employments>(endpoint, params)
}
