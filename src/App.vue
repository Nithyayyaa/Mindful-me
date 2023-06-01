<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { auth } from "./firebaseConfig.js";

import { onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",

  created() {
    onAuthStateChanged(auth, (user) => {
      if (user !== undefined) {
        this.$store.dispatch("login", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
        this.$router.push("/home");
      }
    });
  },
};
</script>
