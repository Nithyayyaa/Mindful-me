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
          <button @click="$router.push('/view')">View</button>
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
          <div @click="clickPicture" class="modal1-option">
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
          <div
            class="modal1-option"
            @click="
              questionnaire = true;
              active = false;
            "
          >
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
    <vs-dialog overflow-hidden v-model="image">
      <template #header>
        <h3 style="font-family: 'PoetsenOne'">
          Please wait while we click a picture
        </h3>
      </template>
      <div
        class="con-content"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Podkova', serif;
        "
        v-if="emotionData === null"
      >
        <video id="video" autoplay width="320" height="240" ref="video"></video>
        <canvas style="display: none" ref="canvas" />
      </div>
      <div style="width: 500px" v-else>
        <vs-alert relief>
          <template #title> Automatic Emotion detection </template>
          This information is auto detected and may not be 100% correct.
          <br />
          <b
            >If most on the values below are low that imply we detect the day as
            neutral</b
          >
        </vs-alert>
        <br /><br />
        <h3>Result</h3>
        <k-progress
          :percent="Number(emotionData.neutral)"
          status="warning"
          active
          :line-height="12"
          :format="() => 'Neutral'"
        ></k-progress>
        <k-progress
          :percent="Number(emotionData.happy)"
          status="success"
          active
          :line-height="12"
          :format="() => 'Happy'"
        ></k-progress>
        <k-progress
          :percent="Number(emotionData.anxious)"
          active
          :line-height="12"
          :format="() => 'Anxious'"
        ></k-progress>
        <k-progress
          :percent="Number(emotionData.angry)"
          status="error"
          active
          :line-height="12"
          :format="() => 'Angry'"
        ></k-progress>
      </div>
    </vs-dialog>
    <vs-dialog overflow-hidden v-model="questionnaire">
      <QuestionnaireComponent />
    </vs-dialog>
  </div>
</template>

<style scoped lang="scss">
* {
  font-family: "Podkova", serif;
}
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
import axios from "axios";
import { db } from "@/firebaseConfig";
import { updateDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import QuestionnaireComponent from "@/components/questionnaireComponent.vue";

export default {
  name: "HomeView",
  components: {
    QuestionnaireComponent,
  },
  data() {
    return {
      active: false,
      image: false,
      srcObject: null,
      emotionData: null,
      questionnaire: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async clickPicture() {
      this.active = !this.active;
      this.image = true;
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.$refs.video.srcObject = stream;
      setTimeout(() => {
        const canvas = this.$refs.canvas;
        canvas
          .getContext("2d")
          .drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL("image/jpeg");
        axios
          .post("http://127.0.0.1:5000/image", { data_url: image_data_url })
          .then(async (resp) => {
            console.log(resp);
            this.emotionData = {
              happy: resp.data[0].emotion.happy,
              angry: resp.data[0].emotion.angry,
              anxious: resp.data[0].emotion.fear,
              neutral: resp.data[0].emotion.neutral,
            };
            const docRef = doc(db, "users", this.$store.state.user.uid);
            const dbResp = await getDoc(docRef);
            const dbData = dbResp.data();
            const lastDate = new Date(dbData.moods.at(-1).stamp.m);
            if (lastDate.getDate() === new Date().getDate()) {
              let moods = dbData.moods;
              moods.pop();
              await updateDoc(docRef, {
                moods: [
                  ...moods,
                  {
                    ...this.emotionData,
                    stamp: new Date(),
                  },
                ],
              });
            } else {
              await updateDoc(docRef, {
                moods: arrayUnion({
                  ...this.emotionData,
                  stamp: new Date(),
                }),
              });
            }
          });
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }, 3000);
    },
  },
};
</script>
