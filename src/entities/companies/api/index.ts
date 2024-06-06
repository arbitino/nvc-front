import type { Database } from '@/shared/types'
import { useApi } from '@/shared/api'
import type { Companies } from '@/entities/companies'

export const fetchCompanies = (database: Database) => {
    const api = useApi()
    const endpoint = `/${database.code}/companies`

    return api.get<Companies>(endpoint)
}
