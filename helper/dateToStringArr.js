function dateToString(dateInput) {
    const optionDate = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }
    const optionTime = {
        hour: "2-digit",
        minute: "2-digit"
    }

    const date = dateInput.toLocaleString("id-ID", optionDate)
    const time = dateInput.toLocaleString("id-ID", optionTime)

    return {date, time}
}

module.exports = dateToString
