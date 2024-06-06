export enum FamousDatabases {
    HOSTING = 'hosting',
    TITAN = 'titan'
}

export interface Database {
    name: string
    code: string
}

export interface Databases {
    databases: Database[]
}

export interface SimpleResponse {
    message: string
}

export interface SelectOption {
    label: string
    value: string
}

export type SelectOptions = SelectOption[]
