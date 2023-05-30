async function GetDays(array) {
  const days = [];
  let day = [];
  let count = -1;

  array.forEach((forecast) => {
    if (day != forecast.dt_txt.split(" ")[0].split("-")[2]){
      count+=1
    }
    day = forecast.dt_txt.split(" ")[0].split("-")[2];
    !days[count] && (days[count] = []);
    days[count].push(forecast);
  });

  return days;
}

export default GetDays;
