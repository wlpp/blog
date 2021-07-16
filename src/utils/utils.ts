export const setCookie = (hours: number, key: string, value: string) => {
  var date = new Date();
  date.setTime(date.getTime() + hours * 3600 * 1000);
  document.cookie = key + "=" + value + "; expires=" + date.toGMTString(); //时差相差8小时
};
export const getCookie = (key: string) => {
  let cookieArr = document.cookie.split(";");
  let value = "";
  cookieArr.map((item, index) => {
    let arr = cookieArr[index].split("=");
    if (arr[0].trim() == key) {
      value = arr[1];
    }
  });
  return value;
};
