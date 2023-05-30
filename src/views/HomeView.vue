<template>
  <div class="home">
    <div class="heading">
      <h1>MINDFUL ME</h1>
      <h6>One stop shop for your mental health needs</h6>
    </div>
    <div class="grid">
      <div class="hor">
        <div class="left">
          <span>Home</span>
          <span>Why us?</span>
          <span>FAQ's</span>
        </div>
        <div class="right">
          <span v-if="!user" @click="login">Login</span>
          <span v-else>Hey, {{ user.displayName }}</span>
        </div>
      </div>
      <div class="talk">
        <img src="@/assets/images/talk.png" alt="" />
        <p>Need to talk through your feelings?</p>
        <button @click="$router.push('/doctors')">connect</button>
      </div>
      <div class="track">
        <img src="@/assets/images/track.png" alt="" />
        <p>Want to keep a track of your mood?</p>
        <div class="buttons">
          <button @click="active = !active">track</button>
          <button @click="this.$router.push('/view')">View</button>
        </div>
      </div>
      <div class="read">
        <img src="@/assets/images/read.png" alt="" />
        <p>Catch up on some reading?</p>
        <button>read</button>
      </div>
    </div>

    <vs-dialog overflow-hidden v-model="active">
      <template #header>
        <h3 style="font-family: 'PoetsenOne'">
          How do you want to track your mood ?
        </h3>
      </template>

      <div class="con-content">
        <div class="modal1-content">
          <div class="modal1-option">
            <lottie-vue-player
              class="lottie"
              src="https://assets9.lottiefiles.com/packages/lf20_0zv8teye.json"
              :player-controls="false"
              style="width: 100%; height: 200px"
              :autoplay="true"
              :loop="true"
            />
            <h6>Automatically with photo</h6>
          </div>
          <div class="modal1-option">
            <lottie-vue-player
              class="lottie"
              src="https://assets7.lottiefiles.com/packages/lf20_tpa51dr0.json"
              :player-controls="false"
              style="width: 100%; height: 200px"
              :autoplay="true"
              :loop="true"
            />
            <h6>Answer 3 questions</h6>
          </div>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  h1,
  h6 {
    font-family: "Podkova", serif;
    margin: 0;
    text-align: center;
  }

  h1 {
    font-weight: 700;
    font-size: 80px;

    color: #000000;
  }

  h6 {
    font-weight: 700;
    font-size: 20px;
    line-height: 33px;

    color: #000000;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas:
      "hor hor hor"
      "talk track read";
    background-color: transparent;

    height: calc(100vh - 200px);
    width: 75vw;

    text-align: center;

    & > div {
      border: 4px solid #000000;
    }

    .hor {
      grid-area: hor;
      border-bottom: none;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .right > span {
        cursor: pointer;
      }

      span {
        font-family: "Podkova";
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 33px;
        text-align: center;

        color: #000000;

        margin-right: 20px;

        &:first-child {
          margin-left: 20px;
        }
      }
    }

    & > div:not(:first-child) {
      font-family: "PoetsenOne";
      color: whitesmoke;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      img {
        width: 300px;
        height: 250px;
      }

      p {
        font-size: 20px;
      }

      button {
        font-family: "Podkova";
        font-style: italic;
        font-weight: 700;
        font-size: 20px;
        line-height: 33px;
        text-align: center;

        text-transform: uppercase;

        padding: 8px 15px;

        background: transparent;

        border: 4px solid #000;
        color: whitesmoke;

        min-width: 130px;

        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        border-radius: 7px;

        cursor: pointer;
      }
    }

    .talk {
      grid-area: talk;
      background-color: #f96969;
    }

    .track {
      grid-area: track;
      background-color: #ecb65f;
      border-left: none;
      border-right: none;
    }

    .read {
      grid-area: read;
      background-color: #6885b8;
    }
  }
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.modal1-content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .modal1-option {
    width: 20vw;
  }

  h6 {
    text-align: center;
    font-family: "Podkova", serif;
  }
}
</style>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      active: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
