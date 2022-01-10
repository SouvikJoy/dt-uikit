import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import DebuggerVue from "../dist/config";
//import Accordion from "../dist/accordion/Accordion.vue";

const app = createApp(App);

app.use(DebuggerVue);

//app.component("Acc", Accordion);

app.mount("#app");
