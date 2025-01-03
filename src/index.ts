import { inspect } from "node:util";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const client = new HubConnectionBuilder()
    .withUrl("https://livetiming.formula1.com/signalrcore", HttpTransportType.WebSockets)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

client.onclose((err) => {
  if (err) {
    console.error("Error while closing client!", err);
  } else {
    console.log("Client closed!");
  }
});

client.onreconnected((connId) => {
  if (connId) {
    console.log("Client reconnected!", connId);
  } else {
    console.log("Client reconnected!");
  }
});

client.onreconnecting((err) => {
  if (err) {
    console.error("Error while reconnecting client!", err);
  } else {
    console.log("Client reconnecting!");
  }
});

client.on("feed", (topic, data, timestamp) => {
  console.log(inspect(["feed", topic, data, timestamp], { depth: null, colors: true, showHidden: false }));
});

client
  .start()
  .then(() => {
    console.log("Client started!");
    client
      .invoke("Subscribe", ["SessionInfo", "WeatherData", "TrackStatus", "RaceControlMessages", "TyreStintSeries", "SessionStatus"])
      .then(res => {
        console.log(inspect(["Current", res], { depth: null, colors: true, showHidden: false }));
      });
  });

process.on("SIGINT", () => {
  client
    .stop()
    .then(() => {
      console.log("Client stopped!");
      process.exit(0);
    });
});
