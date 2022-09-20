import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import piniaPersist from "pinia-plugin-persist";

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router);
app.use(pinia);

globalComponents(app);
utils(app);

app.mount("#app");
