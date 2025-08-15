import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import Main from "../views/dashboard/Main.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        component: Main,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
