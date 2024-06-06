import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useDatabase } from '@/shared/api'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import type { Companies } from '@/entities/companies'
import { COMPANIES_LOADED_MSG, CompanyApi } from '@/entities/companies'
import type { SelectOptions } from '@/shared/types'

export const useCompaniesModel = defineStore('companies', () => {
    const companies = ref<Companies>({ companies: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadCompanies = () => {
        if (!currentDatabase || !currentDatabase.value?.code) {
            useFailedToast(DATABASES_NOT_LOADED_MSG)
            return
        }

        CompanyApi.fetchCompanies(currentDatabase.value).then((companiesData) => {
            companies.value = companiesData
            useSuccessToast(COMPANIES_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadCompanies()
    })

    return { companies, loadCompanies }
})

export const mapCompaniesToSelectOption = (companies: Companies): SelectOptions => {
    if (!companies.companies || !companies.companies.length) {
        return []
    }

    return companies.companies.map((company) => ({
        label: company.name,
        value: company.id.toString()
    }))
}

export const findCompanyById = (_id: number | string) => {
    const id = Number(_id)
    const { companies } = useCompaniesModel()

    if (!companies || !companies.companies.length) {
        return null
    }

    return companies.companies.find((company) => company.id === id) || null
}
