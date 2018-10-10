const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var app = getApp();
function hasTokenPostHeader(){
  var header = {
    "content-Type": "application/x-www-form-urlencoded",
    "tennisToken": app.globalData.tennisToken
  };
  return header;
}
function hasTokenGetHeader(){
  var header = {
    "content-Type": "application/json",
    "tennisToken": app.globalData.tennisToken
  };
  return header;
}
function noTokenGetHeader(){
  var header = {
    "content-Type": "application/json"
  };
  return header;
  
}
function replaceAllChar(char,replaceWith){
  if(char){
    let str = char.replace(/\-/g,"").replace(":","").replace(" ","");
    return str;
  }
  return null;
}

function remove(idx,arr){
  var arr_new = new Array();
  arr.forEach(function(item,index){
    if(idx != index){
      arr_new.push(item)
    }
  })
  return arr_new;
}


module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  hasTokenPostHeader: hasTokenPostHeader,
  hasTokenGetHeader: hasTokenGetHeader,
  noTokenGetHeader: noTokenGetHeader,
  replaceAllChar: replaceAllChar,
  remove: remove
}
