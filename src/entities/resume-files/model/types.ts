export interface Program {
    id: number
    name: string
}

export interface Programs {
    programs: Program[]
}

export interface ExportRequest {
    programs: number[]
    date_start: number
    date_end: number
}
