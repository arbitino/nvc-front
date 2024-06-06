import { useApi } from '@/shared/api'
import type { Vacancy, VacancyTypes } from '@/entities/vacancy'
import type { Database, SimpleResponse } from '@/shared/types'
import type { SearchParameters } from 'ofetch'

export const fetchVacancyTypes = (database: Database, params = {}) => {
    const api = useApi()
    const endpoint = `/${database.code}/vacancy/types`

    return api.get<VacancyTypes>(endpoint, params)
}

export const uploadVacancyFile = (data: FormData, database: Database) => {
    const api = useApi()

    return api.store<SimpleResponse>(`/${database.code}/vacancy/file`, data)
}

export const storeVacancyByFormData = (
    vacancy: Vacancy,
    database: Database,
    params: SearchParameters = {}
) => {
    const api = useApi()

    params.body = vacancy

    return api.store<SimpleResponse>(`/${database.code}/vacancy`, params)
}
