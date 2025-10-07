import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "./App.css";

function App() {
  const prayerTimes = {
    الفجر: "04:15",
    الظهر: "11:27",
    العصر: "14:50",
    المغرب: "17:19",
    العشاء: "18:49",
  };

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextPrayer, setNextPrayer] = useState("الظهر");

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date();
      let next = null;
      let diff = 0;

      for (let [name, time] of Object.entries(prayerTimes)) {
        const [hour, minute] = time.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hour, minute, 0, 0);

        if (prayerDate > now) {
          next = name;
          diff = (prayerDate - now) / 1000; // بالثواني
          break;
        }
      }

      if (!next) {
        const [hour, minute] = Object.values(prayerTimes)[0].split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setDate(prayerDate.getDate() + 1);
        prayerDate.setHours(hour, minute, 0, 0);
        next = Object.keys(prayerTimes)[0];
        diff = (prayerDate - now) / 1000;
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = Math.floor(diff % 60);

      setTimeLeft({ hours, minutes, seconds });
      setNextPrayer(next);
    }

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: `linear-gradient(to bottom, #1e3c72, #2a5298)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Logo Image */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "20px",
        maxWidth: "300px",
        width: "100%"
      }}>
        <img
          src="/images/background.jpg"
          alt="Mosque"
          style={{ 
            width: "100%", 
            height: "auto", 
            borderRadius: "10px",
            maxHeight: "200px",
            objectFit: "cover"
          }}
        />
      </div>

      <Card
        style={{
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255,255,255,0.95)",
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >
        <CardContent>
          <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "5px" }}>
            7 أكتوبر 2025 | 7:33
          </Typography>
          <Typography variant="h6" style={{ color: "#1976d2", marginBottom: "20px" }}>
            مكة المكرمة
          </Typography>

          <Typography
            variant="h3"
            style={{
              color: "#d32f2f",
              fontWeight: "bold",
              marginBottom: "10px",
              letterSpacing: "2px",
            }}
          >
            {timeLeft.hours.toString().padStart(2, "0")} :{" "}
            {timeLeft.minutes.toString().padStart(2, "0")} :{" "}
            {timeLeft.seconds.toString().padStart(2, "0")}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "30px", color: "#555" }}>
            متبقي حتى صلاة {nextPrayer}
          </Typography>

          <Grid container spacing={2}>
            {Object.entries(prayerTimes).map(([name, time], index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card
                  style={{
                    backgroundColor: ["#ffebee", "#e8f5e9", "#e3f2fd", "#fff3e0", "#f3e5f5"][index],
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="h6" style={{ color: "#111" }}>
                    {time}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
