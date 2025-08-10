import Auth from "../pages/Auth.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
