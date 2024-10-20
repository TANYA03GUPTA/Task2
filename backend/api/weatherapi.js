const express = require("express");
const router = express.Router();
const Weather = require("../schema/weatherschema");

router.post("/", async (req, res) => {
  try {
    const { city, day, hourlyTime, temperature } = req.body;

    console.log("Received payload :", req.body);
    let weatherData = await Weather.findOne({ "cities.cityName": city });

    if (!weatherData) {
      weatherData = new Weather({
        cities: [
          {
            cityName: city,
            days: [
              {
                date: day,
                TimelyData: [{ time: hourlyTime, temperature }],
                avgTemperature: temperature,
                maxTemperature: temperature,
                minTemperature: temperature,
              },
            ],
          },
        ],
      });
    } else {
      const cityData = weatherData.cities.find((c) => c.cityName === city);
      let dayData = cityData.days.find(
        (d) => d.date.toISOString().split("T")[0] === day
      );

      if (!dayData) {
        dayData = {
          date: day,
          TimelyData: [{ time: hourlyTime, temperature }],
          avgTemperature: temperature,
          maxTemperature: temperature,
          minTemperature: temperature,
        };
        cityData.days.push(dayData);
      } else {
        dayData.TimelyData.push({ time: hourlyTime, temperature });
        const totalTemp = dayData.TimelyData.reduce(
          (sum, entry) => sum + entry.temperature,
          0
        );
        const count = dayData.TimelyData.length;
        dayData.avgTemperature = totalTemp / count;

        dayData.maxTemperature = Math.max(
          ...dayData.TimelyData.map((entry) => entry.temperature)
        );
        dayData.minTemperature = Math.min(
          ...dayData.TimelyData.map((entry) => entry.temperature)
        );
      }
    }

    await weatherData.save();
    res.status(201).json({
      message: "Weather data is  successfully saved",
      avgTemperature: weatherData.cities
        .find((c) => c.cityName === city)
        .days.find((d) => d.date.toISOString().split("T")[0] === day)
        .avgTemperature,
      minTemperature: weatherData.cities
        .find((c) => c.cityName === city)
        .days.find((d) => d.date.toISOString().split("T")[0] === day)
        .minTemperature,
      maxTemperature: weatherData.cities
        .find((c) => c.cityName === city)
        .days.find((d) => d.date.toISOString().split("T")[0] === day)
        .maxTemperature,
    });
  } catch (err) {
    console.error("Error found in POST /weather:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
});

module.exports = router;
