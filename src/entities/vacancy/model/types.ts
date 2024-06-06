export interface VacancyType {
    id: string
    name: string
}

export interface VacancyTypes {
    types: VacancyType[]
}

export interface Vacancy {
    companyId: number
    type: string
    isActive: boolean
    isSend: boolean
    workActivities?: string
    sex: string
    position: string
    subdivision?: string
    education?: string
    salary?: string
    workExperience?: string
    qualification: string
    workDuty: string
    workConditions?: string
    contacts?: string
    recruiterEmail: string
    employmentType: string
}
