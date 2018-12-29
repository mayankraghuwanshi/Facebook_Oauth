function date_compare(date1 , date2){
    if((date2.getFullYear() - date1.getFullYear()) === 0){
        if((date2.getMonth() - date1.getMonth()) ===0){
            if((date2.getDate() - date1.getDate()) ===0){
                if((date2.getHours() - date1.getHours()) ===0){
                    if((date2.getMinutes() - date1.getMinutes()) === 0){
                        return 'now'}
                    else{
                        return `${date2.getMinutes() - date1.getMinutes()} mins`}
                }else {
                    return `${date2.getHours() - date1.getHours()} Hrs`}
            }else{
                if(((date2.getDate() - date1.getDate())/7)<1 ){
                    return `${(date2.getDate() - date1.getDate())} days`
                }
                else {
                    return `${((date2.getDate() - date1.getDate())/7)} weeks`
                }}}
        else{
            if(((date2.getMonth() - date1.getMonth())/12)<1){
                return `${(date2.getMonth() - date1.getMonth())} months`
            }
            else{
                return `${((date2.getMonth() - date1.getMonth())/12)} Yrs`
            }
        }}else {
        return `${(date2.getFullYear() - date1.getFullYear())} yrs`
    }
}

module.exports = date_compare