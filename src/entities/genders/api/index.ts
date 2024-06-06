import type { Database } from '@/shared/types'
import { useApi } from '@/shared/api'
import { type Genders } from '@/entities/genders'

export const fetchGenders = (database: Database, params: {}) => {
    const api = useApi()
    const endpoint = `/${database.code}/vacancy/genders`

    return api.get<Genders>(endpoint, params)
}
