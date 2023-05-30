import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/font.css";
import * as VueGoogleMaps from "vue2-google-maps";
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
import KProgress from "k-progress";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax);
Vue.component("k-progress", KProgress);
Vue.use(LottieVuePlayer);

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places",
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
