// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import axios from "axios";
import Toast from "muse-ui-toast";

Vue.use(Toast);
Vue.use(Message);
Vue.use(MuseUI);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "background: linear-gradient(to right, rgb(105,144,246), rgb(128,70,180));"
      );
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
