import React, { useState } from "react";

const WeatherApp = () => {
  // State to manage the selected weather condition
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: "Sunny",
  });

  // Function to get the appropriate weather icon based on the condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return "☀";
      case "Cloudy":
        return "☁";
      case "Partly Cloudy":
        return "⛅";
      default:
        return "🌤";
    }
  };

  // Function to handle weather condition change
  const handleConditionChange = (event) => {
    const selectedCondition = event.target.value;
    // Update temperature based on condition (for demonstration purposes)
    let temperature = 22; // Default temperature
    if (selectedCondition === "Sunny") temperature = 30;
    else if (selectedCondition === "Cloudy") temperature = 18;
    else if (selectedCondition === "Partly Cloudy") temperature = 25;

    setWeather({
      temperature,
      condition: selectedCondition,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Islamabad</h1>
      <div style={styles.weatherIcon}>{getWeatherIcon(weather.condition)}</div>
      <div style={styles.temperature}>{weather.temperature}°C</div>
      <div style={styles.condition}>{weather.condition}</div>

      {/* Dropdown to select weather condition */}
      <select
        onChange={handleConditionChange}
        value={weather.condition}
        style={styles.dropdown}
      >
        <option value="Sunny">Sunny</option>
        <option value="Cloudy">Cloudy</option>
        <option value="Partly Cloudy">Partly Cloudy</option>
      </select>
    </div>
  );
};

// Basic styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  weatherIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  temperature: {
    fontSize: "5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  condition: {
    fontSize: "2rem",
    color: "#555",
    marginBottom: "1rem",
  },
  dropdown: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};

export default WeatherApp;