import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import "./assets/styles/variables.css";

import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import router from "./routes";

const vuetify = createVuetify({
  components,
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

app.use(router);

app.use(vuetify);

app.component("Toaster", Toaster);

app.mount("#app");
