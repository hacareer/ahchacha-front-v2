export function dateToKRString(obj: Date) {
  console.log('run');
  try {
    const year = obj.getFullYear();
    const month = obj.getMonth() + 1;
    const date = obj.getDate();
    const hour = obj.getHours();
    const minute = obj.getMinutes();

    let ret = `${year}년 ${month}월 ${date}일 `;
    if (hour > 12) {
      ret += `오후 ${hour - 12}시 ${minute}분`;
    } else {
      ret += `오전 ${hour}시 ${minute}분`;
    }
    return ret;
  } catch (error) {
    return '';
  }
}
/*
  front: negative number
  back: positive number
*/
export interface IDay {
  dateObj: Date;
  year: number;
  month: number;
  date: number;
  day: string;
}
export function getConsecutiveDays(date: Date, front: number, back: number) {
  const curTime = date.getTime();
  const result: IDay[] = [];

  for (let i = front; i <= back; i++) {
    const time = curTime + i * 1000 * 60 * 60 * 24;
    const dateObj = new Date(time);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const day = dateObj.getDay();
    result.push({dateObj, year, month, date, day: dayToString[day]});
  }

  return result;
}
export function get요일(date: Date) {
  if (date) {
    const day = date.getDay();
    return dayToString[day];
  } else {
    return '';
  }
}
export function getFormattedDate(dateObj: Date) {
  if (dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${year}-${month}-${date}`;
  }
  return '';
}
export function formatRemainingTime(dateObj: Date): -1 | string {
  if (!dateObj) return '';

  const nowObj = new Date();
  const nowTime = nowObj.getTime();
  const tarTime = dateObj.getTime();
  const diff = tarTime - nowTime;
  if (diff < 0) {
    return -1;
  }

  const oneSec = 1000;
  const oneMin = oneSec * 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  if (diff / oneMonth >= 1) {
    const month = Math.floor(diff / oneMonth);
    const dayTime = diff % oneMonth;
    const day = Math.floor(dayTime / oneDay);
    return `${month}개월 ${day}일`;
  }
  if (diff / oneDay >= 1) {
    const day = Math.floor(diff / oneDay);
    const hourTime = diff % oneDay;
    const hour = Math.floor(hourTime / oneHour);
    return `${day}일 ${hour}시간`;
  }
  if (diff / oneHour >= 1) {
    const hour = Math.floor(diff / oneHour);
    const minTime = diff % oneHour;
    const min = Math.floor(minTime / oneMin);
    return `${hour}시간 ${min}분`;
  }
  if (diff / oneMin >= 1) {
    const min = Math.floor(diff / oneSec);
    return `${min}분`;
  }
  return '알수없음';
}
const dayToString: {[index: number]: string} = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};
