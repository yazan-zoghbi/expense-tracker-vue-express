import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { VDateInput } from "vuetify/labs/VDateInput";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import "./assets/styles/variables.css";

import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";

import { createVuetify } from "vuetify";

import router from "./routes";
import { createPinia } from "pinia";

const vuetify = createVuetify({
  components: { ...components, VDateInput },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);

app.use(vuetify);

app.component("Toaster", Toaster);

app.use(pinia);

app.mount("#app");
