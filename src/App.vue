<template>
  <div class="menu" v-if="data.length > 0">
    <button @click="toggleActionWindow">Добавить новую карточку</button>
    <div class="spacer"></div>
    <button @click="showAbout">About</button>
  </div>

  <div class="center emptyPage" v-else>
    <p>У вас нет карточек, добавьте одну с помощью кнопки ниже.</p>
    <button @click="toggleActionWindow">Добавить новую карточку</button>
  </div>

  <transition name="fade">
    <div class="center darkbg" v-if="showActionWindow">
      <action-window
        :actionCallback="manageCard"
        :cancelCallback="toggleActionWindow"
        :isEditing="isEditing"
        :editingID="editingID"
        :editingData="editingData"
      />
    </div>
  </transition>
  <transition-group class="container" tag="div" name="cards" mode="in-out">
    <!-- <div class="container"> -->
      <div
        v-for="card in data"
        :key="card.name">
        <suspense>
          <template #default>
            <card
              class="card"
              :name="card.name"
              :resources="card.resources"
              :isDone="card.isDone"
              @edit="editCard(card.name)"
              @delete="deleteCard(card.name)"
              @toggleDone="toggleDone(card.name)"
            />
          </template>
          <template #fallback>
            <!-- <div class="cardLoader" :key="card.name">Loading...</div> -->
            <card-loader :key="card.name" />
          </template>
        </suspense>
      </div>
    <!-- </div> -->
  </transition-group>
</template>

<script>
import ActionWindow from "./components/ActionWindow.vue";
// import Card from "./components/Card.vue";
import { ref, readonly, defineAsyncComponent } from "vue";
import CardLoader from "./components/CardLoader.vue";

export default {
  components: { 
    Card: defineAsyncComponent(() => import("./components/Card.vue")),
    ActionWindow,
    CardLoader
  },
  name: "App",
  data: () => ({
    showActionWindow: false,
    isEditing: false,
    editingID: "",
    editingData: {},
  }),
  setup() {
    var data = ref([]);

    var savedData = localStorage.getItem("GGHdata");
    if (savedData !== null) {
      data.value = JSON.parse(savedData);
    }

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("GGHdata", JSON.stringify(data.value));
    })

    return { data };
  },
  methods: {
    addCard(data) {
      var index = this.data.findIndex((val) => {
        if (val.name === data.name) return true;
        return false;
      });
      if (index === -1) {
        this.data.push(data);
        this.toggleActionWindow();
      } else {
        alert("Карточка с такой датой уже существует!");
      }
    },

    editCard(id, newData) {
      var index = this.data.findIndex((val) => {
        if (val.name === id) return true;
        return false;
      });
      if (!newData) {
        this.editingID = id;
        this.editingData = readonly(this.data[index]);
        this.isEditing = true;
      } else {
        this.data[index] = { ...this.data[index], ...newData };
        this.$forceUpdate();
      }
      this.toggleActionWindow();
    },

    deleteCard(id) {
      if (window.confirm("Вы уверены, что хотите удалить эту карточку?")) {
        var index = this.data.findIndex((val) => {
          if (val.name === id) return true;
          return false;
        });
        this.data.splice(index, 1);
      }
    },

    manageCard(isEditing, firstArg, secondArg) {
      if (isEditing) this.editCard(firstArg, secondArg);
      else this.addCard(firstArg);
    },

    toggleDone(id) {
      var index = this.data.findIndex((val) => {
        if (val.name === id) return true;
        return false;
      });
      this.data[index].isDone = !this.data[index].isDone;
      this.$forceUpdate();
    },

    toggleActionWindow() {
      if (this.showActionWindow) {
        this.editingID = null;
        this.editingData = {};
        this.isEditing = false;
        this.showActionWindow = false;
      } else {
        this.showActionWindow = true;
      }
    },

    showAbout() {
      alert('Made by Catink123. @catink123 on any platform.');
    },
  },
};
</script>

<style>
body {
  background: linear-gradient(rgb(15, 55, 107), rgb(80, 128, 192));
  background-attachment: fixed;
  height: 100vh;
  margin: 0;
}

div.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

div.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  justify-content: center;
}

div.darkbg {
  background: rgba(0, 0, 0, 0.25);
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.cards-leave-active,
.card-enter-active {
  position: absolute;
}

.card {
  transition: all 0.25s ease;
  position: relative;
}

.cardLoader {
  /* position: absolute; */
  width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin: 15px;
  color: white;
  font-size: 24px;
  font-family: sans-serif;
  text-align: center;
  vertical-align: middle;
}

.menu {
  display: flex;
  gap: 5px;
  padding: 5px;
}

.menu button,
.emptyPage button {
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 5px 0 rgba(255, 255, 255, 0.5) inset;
  border-radius: 3px;
  transition-duration: 0.15s;
}

.menu button:hover,
.emptyPage button:hover {
  background: rgba(255, 255, 255, 0.15);
  transition-duration: 0.15s;
}

.menu button:active,
.emptyPage button:active {
  background: white;
  color: black;
  transition-duration: 0s;
}

div.spacer {
  flex-grow: 1;
}

.emptyPage p {
  font-family: sans-serif;
  color: white;
}
</style>
