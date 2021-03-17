export const convertDateToClockTime = (date) => {
  const dt = new Date(date);
  let hours = dt.getHours();
  let minutes = dt.getMinutes();

  hours = hours % 12;
  hours = hours ? hours : 12; // if hour equals 0, make it 12
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
};
