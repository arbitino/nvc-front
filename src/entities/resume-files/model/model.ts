import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useDatabase } from '@/shared/api'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import { PROGRAMS_LOADED_MSG, ResumeFilesApi } from '@/entities/resume-files'
import type { SelectOptions } from '@/shared/types'
import type { Programs } from '@/entities/resume-files'

export const useProgramsModel = defineStore('resume-files-programs', () => {
    const programs = ref<Programs>({ programs: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadPrograms = () => {
        if (!currentDatabase || !currentDatabase.value?.code) {
            useFailedToast(DATABASES_NOT_LOADED_MSG)
            return
        }

        ResumeFilesApi.fetchPrograms(currentDatabase.value).then((_programs) => {
            programs.value = _programs
            useSuccessToast(PROGRAMS_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadPrograms()
    })

    return { programs, loadPrograms }
})

export const mapProgramsToSelectOption = (programs: Programs): SelectOptions => {
    if (!programs.programs || !programs.programs.length) {
        return []
    }

    return programs.programs.map((program) => ({
        label: program.name,
        value: program.id.toString()
    }))
}

export const findProgramById = (_id: number | string) => {
    const id = Number(_id)
    const { programs } = useProgramsModel()

    if (!programs || !programs.programs.length) {
        return null
    }

    return programs.programs.find((program) => program.id === id) || null
}
