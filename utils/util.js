const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkinput(name,cardid,email){
  
  if (name == null || isNull(name) ||
  cardid == null || isNull(cardid)|| 
  email == null || isNull(email)){
    return false;
  }else{
    return true;
  }
}
function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}
module.exports = {
  formatTime: formatTime,
  checkinput: checkinput
}
