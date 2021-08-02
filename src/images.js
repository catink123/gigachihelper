var c = require.context("./assets", false, /\.png$/);

export default {
  acquaint: c("./acquaint.png"),
  intertwined: c("./intertwined.png"),
  mlessSD: c("./mlessSD.png"),
  mlessSG: c("./mlessSG.png"),
  primogem: c("./primogem.png")
}