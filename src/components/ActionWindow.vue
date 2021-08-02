<template>
  <div class="window">
    <p class="title">
      {{ isEditing ? "Изменить карточку" : "Добавить карточку" }}
    </p>
    <form @submit="parse">
      <p>
        <label for="date">Дата </label>
        <input type="date" name="date" v-model="date" />
      </p>
      <div class="sep"></div>
      <p>
        <label for="resSelect">Ресурс </label>
        <select name="resSelect" v-model="currentRes">
          <option v-for="el in restypes" :key="el.type" :value="el.type">
            {{ el.name }}
          </option>
        </select>
        <input type="number" v-model="currentResCount" />
      </p>
      <p>
        <button @click.prevent="addResource">Добавить ресурс</button>
      </p>
      <p>Список выбранных ресурсов:</p>
      <div class="resContainer">
        <div class="resItem" v-for="res in selectedResList" :key="res.type">
          <img :src="res.image" />
          <p class="name">{{ res.name }}</p>
          <p class="count">x{{ res.count }}</p>
          <button @click.prevent="deleteResource(res.type)">✖</button>
        </div>
      </div>
      <div class="controls">
        <input type="submit" :value="isEditing ? 'Изменить' : 'Добавить'" />
        <button @click.prevent="cancelCallback">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
import ResourceTypes from "../ResourceTypes.js";
import { ref } from "vue";

export default {
  name: "ActionWindow",
  computed: {
    restypes() {
      var retList = [];
      for (const i in ResourceTypes) {
        retList.push({
          type: i,
          name: ResourceTypes[i].name,
        });
      }
      return retList;
    },
    selectedResList() {
      var retList = [];

      for (const i in this.resources) {
        retList.push({
          type: this.resources[i].type,
          name: ResourceTypes[this.resources[i].type].name,
          count: this.resources[i].count,
          image: ResourceTypes[this.resources[i].type].image,
        });
      }

      return retList;
    },
  },
  props: {
    isEditing: Boolean,
    editingID: String,
    editingData: Object,
    actionCallback: Function,
    cancelCallback: Function,
  },
  data: () => ({
    currentRes: "",
    currentResCount: 0,
    // resources: [],
    // date: "2021-08-01",
  }),
  setup(props) {
    var date = ref("2021-08-01");
    var resources = ref([]);
    if (props.isEditing) {
      date = ref(props.editingID);

      resources = ref(JSON.parse(JSON.stringify(props.editingData.resources)));
    }
    return { date, resources };
  },
  methods: {
    parse(e) {
      e.preventDefault();
      var data = {
        name: this.date,
        resources: JSON.parse(JSON.stringify(this.resources)),
      };
      if (this.isEditing) this.actionCallback(true, this.editingID, data);
      else this.actionCallback(false, data);
    },
    addResource() {
      if (this.currentRes !== "")
        this.resources.push({
          type: this.currentRes,
          count: this.currentResCount,
        });
    },
    deleteResource(key) {
      let index = this.resources.findIndex((val) => {
        if (val.type === key) return true;
        return false;
      });
      this.resources.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.window {
  border: 1px solid white;
  box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.25) inset;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  color: white;
  font-family: sans-serif;
  width: fit-content;
  transition: all 0.25s ease;
  max-height: 1200px;
  height: fit-content;
}

p.title {
  margin: 10px;
  font-size: 24px;
  margin-bottom: 0;
}

form {
  margin: 10px;
  margin-top: 0;
}

li {
  list-style-type: none;
}

li img {
  width: 25px;
}

ul {
  padding: 0;
}

div.sep {
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}

input[type="number"] {
  width: 40px;
  border-left: none;
  border-radius: 0 3px 3px 0;
}

div.controls {
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-direction: row-reverse;
  gap: 5px;
}

button,
div.controls input[type="submit"] {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 6px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 5px 0 rgba(255, 255, 255, 0.5) inset;
  border-radius: 3px;
  transition-duration: 0.15s;
}

div.controls button,
div.controls input[type="submit"] {
  padding: 10px;
}

button:hover,
div.controls input[type="submit"]:hover {
  background: rgba(255, 255, 255, 0.15);
  transition-duration: 0.15s;
}

button:active,
div.controls input[type="submit"]:active {
  background: white;
  color: black;
  transition-duration: 0s;
}

div.resContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 1200px;
}

div.resItem {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  box-shadow: 0px 0px 5px 0 rgba(255, 255, 255, 0.25) inset;
  border-radius: 3px;
  transition: all 0.25s ease;
}

div.resItem p {
  margin: auto;
}

div.resItem img {
  width: 40px;
}

div.resItem .name {
  flex-grow: 1;
}

div.resItem .count {
  width: 40px;
  text-align: center;
}

div.resItem button {
  border: none;
  border-radius: 0;
  border-left: 1px solid rgba(255, 50, 50, 0.5);
  box-shadow: none;
  background-color: rgba(255, 50, 50, 0.25);
}

div.resItem button:hover {
  background: rgba(255, 50, 50, 0.5);
}

div.resItem button:active {
  background: rgb(255, 50, 50);
  color: white;
}

input,
select {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 3px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0px 0px 5px 0 rgba(255, 255, 255, 0.25) inset;
}

input:focus,
select:focus {
  background: white;
  color: black;
}
</style>