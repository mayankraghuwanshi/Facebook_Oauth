module.exports =
    function date() {
        let date = new Date()
        let day , month , hours,year , time;
        day = date.getDate()
        month = date.getMonth()+1
        hours = date.getHours()
        year = date.getFullYear()
        minuts = date.getMinutes()
        if(hours===0){
            time = `${hours+1}:${minuts} AM`
        }else if(hours >12){
            time = `${hours-12}:${minuts} PM`
        }
        return `${day}/${month}/${year} - ${time}`
    }