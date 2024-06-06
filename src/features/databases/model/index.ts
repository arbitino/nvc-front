import { useDatabase } from '@/shared/api'
import type { Databases, SelectOptions } from '@/shared/types'

export const findDatabaseByCode = (code: string) => {
    const { databases } = useDatabase()

    if (!databases || !databases.databases.length) {
        return null
    }

    return databases.databases.find((database) => database.code === code)
}

export const mapDatabasesToSelectOptions = (databases: Databases): SelectOptions => {
    if (!databases || !databases.databases.length) {
        return []
    }

    return databases.databases.map((db) => ({
        label: db.name,
        value: db.code
    }))
}
