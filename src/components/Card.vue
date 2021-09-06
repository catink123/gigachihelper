<template>
  <div class="card">
    <p class="name">{{ name }}</p>
    <div class="resContainer">
      <div v-for="resObj in resources" class="res" :key="resObj.key">
        <img :src="restypes[resObj.type].image">
        <p class="name">{{ restypes[resObj.type].name }}</p>
        <p class="count">x{{ resObj.count }}</p>
      </div>
    </div>
    <div class="controls">
      <button class="grow" :class="isDone ? 'done' : null" @click="toggleDone">Открыть</button>
      <button @click="edit">🖉</button>
      <button @click="del">✖</button>
    </div>
    <space class="space" :width="300" :height="400" />
    <transition name="fade">
      <div class="goal" v-if="isDone">
        <img :src="goalImageSrc">
      </div>
    </transition>
  </div>
</template>

<script>
import ResourceTypes from '../ResourceTypes.js';
import Space from './Space.vue';
import lf from 'localforage';

export default {
  name: 'Card',
  components: { Space },
  computed: {
    restypes: () => ResourceTypes
  },
  props: {
    name: String,
    resources: Array,
    isDone: Boolean
  },
  methods: {
    edit() {
      this.$emit("edit");
    },

    del() {
      this.$emit("delete");
    },

    toggleDone() {
      this.$emit("toggleDone");
    }
  },
  setup(props) {
    var goalImageSrc;
    lf.getItem(props.name, src => {
      goalImageSrc = src;
    });
    return {goalImageSrc};
  },
  mounted() {
    console.log(this.goalImageSrc);
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  font-family: sans-serif;
  overflow: hidden;
  color: white;
  border: 15px solid;
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.5) inset;
  background: rgba(0, 0, 0, 0.25);
  background-image: repeating-linear-gradient(45deg, transparent 1px 60px, rgba(255, 255, 255, 0.15) 60px 61px), repeating-linear-gradient(-45deg, transparent 1px 60px, rgba(255, 255, 255, 0.15) 60px 61px);
  border-image: url("../assets/border.png") 30;
  border-image-outset: 0px;
  background-clip: content-box;
}

.card > .name {
  margin: 0px;
  padding: 5px;
  text-align: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.25), transparent);
}

.resContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  padding: 5px;
}

.res {
  display: flex;
  height: 50px;
  width: 100%;
  gap: 5px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  z-index: 2;
  align-items: center;
  box-sizing: border-box;
}

.res > img {
  width: 50px;
}

.res > .name {
  flex-grow: 1;
  margin: 0;
}

.res > .count {
  width: 40px;
  text-align: center;
}

.space {
  position: absolute;
  pointer-events: none;
  z-index: 1;
}

div.controls {
  display: flex;
  gap: 5px;
  padding: 5px;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
}

button {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 5px 0 rgba(255, 255, 255, 0.5) inset;
  border-radius: 3px;
  transition-duration: 0.15s;
}

button:hover {
  background: rgba(255, 255, 255, 0.15);
  transition-duration: 0.15s;
}

button:active {
  background: white;
  color: black;
  transition-duration: 0s;
}

.grow {
  flex-grow: 1;
}

.done {
  background: rgba(0, 255, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.goal {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>