import { createApp } from 'vue'
import App from './App.vue'
import localforage from 'localforage';

localforage.config({
  name: 'gigachihelper'
});

document.title = "Genshin Impact Gachi Helper";

createApp(App).mount('#app')
