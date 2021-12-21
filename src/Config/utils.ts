export const formatDate = (date: Date) => {
    return date.toString().substring(0, date.toString().length - 18)
}