import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./Charts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const WeatherCharts = ({ cityWeatherInfo }) => {
  const temperatureData = {
    labels: cityWeatherInfo.map((city) => city.name),
    datasets: [
      {
        label: "Temperature (°C)",
        data: cityWeatherInfo.map((city) => city.temperature),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const humidityData = {
    labels: cityWeatherInfo.map((city) => city.name),
    datasets: [
      {
        label: "Humidity (%)",
        data: cityWeatherInfo.map((city) => city.humidity),
        backgroundColor: cityWeatherInfo.map(
          () =>
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            }, 0.6)`
        ),
      },
    ],
  };

  return (
    <div className="charts-container mt-5 Mainbody">
      <h3 className="text-center">Weather Charts</h3>
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center">Temperature Bar Chart</h4>
          <Bar
            className="bar-style"
            data={temperatureData}
            options={{ responsive: true }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-center">Humidity Pie Chart</h4>
          <Pie
            className="pie-style"
            data={humidityData}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherCharts;
