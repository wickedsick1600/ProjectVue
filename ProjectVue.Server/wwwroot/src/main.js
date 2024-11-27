import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './views/index.js';
import { createPinia } from 'pinia';

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import specific icons
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

// Import FontAwesome Vue component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the icons to the library
library.add(faEdit, faCheck, faTimes)


const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
