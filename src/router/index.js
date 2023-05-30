import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DoctorView from "../views/doctorView.vue";
import IndexView from "../views/index.vue";
import ReportView from "@/views/reportView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/doctors",
    name: "doctors",
    component: DoctorView,
  },
  {
    path: "/view",
    name: "view",
    component: ReportView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
