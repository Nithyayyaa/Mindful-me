<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>

<script>
import { auth } from "./firebaseConfig.js";

import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.$store.dispatch("login", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    });
  },
};
</script>
