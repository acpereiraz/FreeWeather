import ReactApexChart from "react-apexcharts";
import "./styles/AreaChart.css";

const AreaChart = ({isDark, data}) => {

  let minTemp = [], maxTemp = [], timeArr = [];
  data.forEach((item) => {
    minTemp.push(item.main.temp_min.toFixed(1));
    maxTemp.push(item.main.temp_max.toFixed(1));
    timeArr.push(item.dt_txt.split(" ")[1].replace(":00", ""));
  });

  const chartOptions = {
    chart: {
      height: 280,
      type: "area",
      stacked: false,
      foreColor: '#57646f',
      toolbar: {
        show: false,
      },
          dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 3,
          left: 0,
          blur: 6,
          color: 'purple',
          opacity: 0.3
      },
      fontFamily: 'Roboto',
          animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      },
      
    },
    dataLabels: {
      enabled: false
    },
    theme: {
        mode: 'light', 
        palette: 'palette10', 
        monochrome: {
            enabled: false,
            color: '#A020F0',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    series: [
      {
        name: "High Temp",
        data: maxTemp
      },
      {
        name: "Low Temp",
        data: minTemp
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: `${isDark ? 'dark' : 'light'}`,
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.6,
      }
    },
    xaxis: {
      categories: timeArr,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    tooltip: {
      custom: function({series, dataPointIndex}) {
        return (
          '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />' +
          '<div id="weather-temps" class="">' +
            '<p id="weather-temps-container" class="flex">'+
              '<span class="material-symbols-outlined text-[#A300D6] scale-[110%] -translate-x-1">expand_less</span>'+series[0][dataPointIndex]+' °C'+
            '</p>' +
            '<p id="weather-temps-container" class="flex">' +
              '<span class="material-symbols-outlined text-[#7D02EB] scale-[110%] -translate-x-1">expand_more</span>'+series[1][dataPointIndex]+' °C'+ 
            '</p>'+
          '</div>'
        );
      },
    },
    grid: {
      show: true,
      borderColor: '#878787',
      strokeDashArray: 8,
      position: 'back',
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 5,
      labels: {
          formatter: (value) => { return (((value%1)==0)?value:value.toFixed(1))+"°" },
      },
    }
  };
  
  
  return (
    <div id="areachartdiv" className="w-full">
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      type="area"
      height={300}
    />
    </div>
  );
};

export default AreaChart;
    