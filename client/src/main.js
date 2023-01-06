import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';

const emitter = mitt();

// createApp(App).mount('#app')
const app =createApp(App)
app.use(router);
// app.use(VueSimpleAlert);

app.config.globalProperties.emitter = emitter;

app.mount('#app')