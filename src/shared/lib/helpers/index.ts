export const formDateToTimeStamp = (formDate?: string) => {
    const date = formDate ? new Date(formDate).getTime() : Date.now()

    return date / 1000
}
