import type { Database } from '@/shared/types'
import { type Activities } from '@/entities/activities'
import { useApi } from '@/shared/api'

export const fetchActivities = (database: Database, params = {}) => {
    const api = useApi()
    const endpoint = `/${database.code}/vacancy/activities`

    return api.get<Activities>(endpoint, params)
}
