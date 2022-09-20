// 中国标准时间format yyyy-mm-dd
const format = (time) => {
  let ymd = "";
  let mouth =
    time.getMonth() + 1 >= 10
      ? time.getMonth() + 1
      : "0" + (time.getMonth() + 1);
  let day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();

  ymd += time.getFullYear() + "-"; // 获取年份。
  ymd += mouth + "-"; // 获取月份。
  ymd += day; // 获取日。
  return ymd; // 返回日期。
};

export const getAllDate = (start, end) => {
  let dateArr = [];
  var startTime = new Date(start).getTime();
  var endTime = new Date(end).getTime();

  for (var k = startTime; k <= endTime; ) {
    dateArr.push(format(new Date(parseInt(k + 24 * 60 * 60 * 1000))));
    k = k + 24 * 60 * 60 * 1000;
  }
  return dateArr;
};

// getalldays(start, end) {
//   var startTime = new Date(start).getTime();
//   var endTime = new Date(end).getTime();
//   for (var k = startTime; k <= endTime; ) {
//     console.log(new Date(parseInt(k)));
//     dateArr.push(new Date(parseInt(k)))
//     k = k + 24 * 60 * 60 * 1000;
//   }
// }
