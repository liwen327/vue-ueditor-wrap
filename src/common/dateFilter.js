const dateFormat = function (createTime) {
  if (createTime) {
    var year = new Date(createTime).getFullYear();
    var month = new Date(createTime).getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    var day = new Date(createTime).getDate();
    day = day < 10 ? ('0' + day) : day;
    var hour = new Date(createTime).getHours();
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = new Date(createTime).getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = new Date(createTime).getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
}

export {
  dateFormat
}
