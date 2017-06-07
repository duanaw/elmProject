/* 
* @Author: Marte
* @Date:   2017-06-07 09:39:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-07 10:39:50
*/

export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1,(data.getFullYear()+'').substr(4-RegExp.$1.length))
    }
    var o={
        'M+':data.getMonth()+1,
        'd+':data.getDate(),
        'h+':data.getHours(),
        'm+':data.getMinutes(),
        's+':data.getSeconds()
    };
    for(var k in o){
        if(new RegExp(`(${k}`).test(fmt)){
            var str=o[k]+'';
            fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
        }
    }
    return fmt;
};
function padLeftZero(str){
    return ('00'+str).substr(str.length);
}