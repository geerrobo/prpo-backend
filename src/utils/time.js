const getDateTime = () => {
    let d = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok',
        hour12: false
    })
    let years = new Date(d).getFullYear()
    let months = new Date(d).getMonth()
    let days = new Date(d).getDate()
    let hours = new Date(d).getHours()
    let mins = new Date(d).getMinutes()
    let seconds = new Date(d).getSeconds()
    let datetime = `${years}-${months}-${days} ${hours}:${(String(mins).length === 1) ? '0' + String(mins) : String(mins)}:${(String(seconds).length === 1) ? '0' + String(seconds) : String(seconds)}`

    // handle datetime error
    if (isNaN(years) || isNaN(months)) {
        years = new Date().getFullYear()
        months = new Date().getMonth()
        days = new Date().getDate()
        hours = new Date().getHours()
        mins = new Date().getMinutes()
        seconds = new Date().getSeconds()

        hours = Number(hours)
        hours += 7
        if (hours >= 24) {
            days += 1
            hours -= 24
        }

        datetime = `${years}-${months}-${days} ${hours}:${(String(mins).length === 1) ? '0' + String(mins) : String(mins)}:${(String(seconds).length === 1) ? '0' + String(seconds) : String(seconds)}`
    }

    // return datetime
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = { getDateTime }