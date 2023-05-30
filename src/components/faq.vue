<template>
  <div @click="open = !open">
    <h3 :class="open && 'open'">{{ question }}</h3>
    <Transition mode="in-out">
      <p v-if="open">{{ answer }}</p>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: min(750px, 60vw);
  margin: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 131px -41px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 131px -41px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 131px -41px rgba(0, 0, 0, 1);
  transition: all 350ms linear;

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 33px;
    color: #000000;
    font-family: "Podkova";
    width: 100%;

    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 35px;
      width: 35px;
      background-image: url("../assets/images/chevron.png");
      background-size: cover;
      top: 0;
      right: 0;
      transition: all 350ms linear;
    }

    &.open::after {
      transform: rotate(180deg);
    }
  }

  p {
    color: rgb(176, 176, 176);
    font-family: sans-serif;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "faq view",
  props: {
    question: String,
    answer: String,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>
