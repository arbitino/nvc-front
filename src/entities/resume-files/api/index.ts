import type { Database, SimpleResponse } from '@/shared/types'
import { useApi } from '@/shared/api'
import type { ExportRequest, Programs } from '@/entities/resume-files'

export const fetchPrograms = (database: Database) => {
    const api = useApi()
    const endpoint = `/${database.code}/resume-files/programs`

    return api.get<Programs>(endpoint)
}

export const exportResumeFile = (params: ExportRequest, database: Database) => {
    const api = useApi()

    return api.store<SimpleResponse>(`/${database.code}/resume-files/export/file`, params)
}
