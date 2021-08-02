<template>
  <canvas :id="id" :width="width" :height="height"></canvas>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Space",
  props: {
    width: Number,
    height: Number,
  },
  setup() {
    var id = Math.round(Math.random() * 10000);

    onMounted(() => {
      var canv = document.getElementById(id);
      var c = canv.getContext("2d");

      var pixels = [];
      for (var x = 0; x < 100; x++) {
        pixels.push([
          Math.floor(Math.random() * canv.width),
          Math.floor(Math.random() * canv.height),
        ]);
      }

      var prevTime = 0;
      function draw(t) {
        c.clearRect(0, 0, canv.width, canv.height);
        var delta = t - prevTime;
        prevTime = t;

        for (const i in pixels) {
          c.fillStyle =
            "rgba(255, 255, 255, " + pixels[i][1] / canv.height + ")";
          c.fillRect(pixels[i][0], pixels[i][1], 1, Math.log(canv.height / pixels[i][1]) * 3);

          pixels[i][1] -= Math.log((canv.height / pixels[i][1]) * delta * 0.1);
          if (pixels[i][1] < 0) {
            pixels[i][1] =
              canv.height + Math.floor(Math.random() * canv.height / 2);
            pixels[i][0] = Math.floor(Math.random() * canv.width);
          }
        }

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    });

    return {id};
  },
};
</script>