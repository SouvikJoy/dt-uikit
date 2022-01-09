import { createApp } from "vue";
import App from "./App.vue";
import dtUiKit from "../dist/dtUiKit.mjs";
import "./assets/main.css";

createApp(App).use(dtUiKit).mount("#app");
