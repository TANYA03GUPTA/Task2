import React from "react";

const WeatherTable = ({ cityWeatherInfo }) => {
  return (
    <div className="container mt-5">
      <h3 className="text-center">City Weather Information</h3>
      <table className="table table-bordered text-center mt-3">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {cityWeatherInfo.map((city) => (
            <tr key={city.name}>
              <td>{city.name}</td>
              <td>{city.temperature.toFixed(2)}</td>

              <td>{city.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
