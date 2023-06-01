<template>
  <main>
    <div class="week">
      <h3>Week</h3>
      <h6>7th May - 14th May</h6>
      <div class="week-report">
        <span>
          <img src="@/assets/icons/arrow.png" alt="" @click="prevWeek()" />
        </span>
        <div class="emotion-box" v-for="(val, index) in trackData" :key="index">
          <div class="lottie">
            <lottie-vue-player
              :src="emotionToAnimation(maxEmotion(val))"
              :player-controls="false"
              style="width: 100%; height: 200px"
              :autoplay="true"
              :loop="false"
            >
            </lottie-vue-player>
            <h6 style="text-align: center; font-size: 10px">
              {{ maxEmotion(val) }} on {{ formatDate(val) }}
            </h6>
          </div>
          <div class="vals">
            <h6 class="vals-h6">Stats for the day</h6>
            <div>
              <k-progress
                :percent="Number(val.neutral)"
                status="warning"
                active
                :line-height="12"
                :format="() => 'Neutral'"
              ></k-progress>
              <k-progress
                :percent="Number(val.happy)"
                status="success"
                active
                :line-height="12"
                :format="() => 'Happy'"
              ></k-progress>
              <k-progress
                :percent="Number(val.anxious)"
                active
                :line-height="12"
                :format="() => 'Anxious'"
              ></k-progress>
              <k-progress
                :percent="Number(val.angry)"
                status="error"
                active
                :line-height="12"
                :format="() => 'Angry'"
              ></k-progress>
            </div>
          </div>
        </div>
        <span>
          <img
            src="@/assets/icons/arrow.png"
            alt=""
            style="transform: rotateZ(180deg)"
            @click="nextWeek()"
          />
        </span>
      </div>
      <div class="average-report">
        <lottie-vue-player
          :src="emotionToAnimation(getAvgMoodLottie)"
          :player-controls="false"
          style="width: 100%; height: 200px"
          :autoplay="true"
          :loop="false"
        />
        <k-progress
          :percent="getAvgMoodNeutral"
          status="warning"
          active
          :line-height="12"
          :format="() => 'Neutral'"
        ></k-progress>
        <k-progress
          :percent="getAvgMoodHappy"
          status="success"
          active
          :line-height="12"
          :format="() => 'Happy'"
        ></k-progress>
        <k-progress
          :percent="getAvgMoodAnxious"
          active
          :line-height="12"
          :format="() => 'Anxious'"
        ></k-progress>
        <k-progress
          :percent="getAvgMoodAngry"
          status="error"
          active
          :line-height="12"
          :format="() => 'Angry'"
        ></k-progress>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  height: 100vh;
  width: 100vw;
  display: grid;
  gap: 2em;
  grid-template-areas:
    "week week"
    "month guide";
  grid-auto-rows: 1fr 5fr;
  .week {
    grid-area: week;
    padding: 30px;

    h3 {
      font-family: "Podkova";
      font-size: 50px;
      margin-bottom: 0;
    }

    h6 {
      font-family: "Podkova";
      font-size: 20px;
      color: #727171;
      margin-top: 0;
      margin-bottom: 5px;
    }

    .week-report {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 2px solid #f96969;
      border-radius: 20px;
      place-items: center;

      padding: 20px;

      span {
        background-color: #f96969;
        border-radius: 100%;
        // height: 70px;
        // width: 70px;
        padding: 20px;

        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40px;
        }
      }

      .emotion-box {
        height: 200px;
        width: 100%;
      }

      .vals {
        display: none;
      }

      .emotion-box:hover {
        border: 2px solid #6885b8;
        border-radius: 20px;

        .lottie {
          display: none;
        }

        .vals {
          display: grid;
          grid-template-rows: 2fr 2fr;
          height: 180px;

          padding: 10px;

          &-h6 {
            text-align: center;
          }
        }
      }
    }
    .average-report {
      max-width: 35%;
      margin-top: 20px;
      // display: flex;
      // align-items: center;
      // flex-direction: column;
      // justify-content: space-between;
      border: 2px solid #f96969;
      border-radius: 20px;

      padding: 20px;
    }
  }
}
</style>
<script>
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      userData: null,
      trackData: [],
      weekData: [],
      weekIndex: 0,
    };
  },
  beforeMount() {
    const docRef = doc(db, "users", this.$store.state.user.uid);
    getDoc(docRef).then((userData) => {
      this.userData = userData.data();
      this.trackData = userData.data().moods;
      this.weekIndex = Math.max(this.trackData.length - 7, 0);
      this.getWeekData();
    });
  },
  methods: {
    maxEmotion(input) {
      let emotion = "";
      Object.keys(input).reduce((prev, curr) => {
        if (typeof input[curr] !== "object") {
          let numVal = Number(input[curr]);
          if (numVal > prev) {
            emotion = curr;
            return numVal;
          } else {
            return prev;
          }
        }
      }, 0);
      return emotion;
    },
    emotionToAnimation(emotion) {
      switch (emotion) {
        case "happy":
          return "https://assets1.lottiefiles.com/packages/lf20_cehxtohr.json";
        case "angry":
          return "https://assets4.lottiefiles.com/packages/lf20_SkHItGfvka.json";
        case "anxious":
          return "https://assets10.lottiefiles.com/private_files/lf30_qpfajs7r.json";
        case "neutral":
          return "https://assets8.lottiefiles.com/packages/lf20_ilpffean.json";
      }
    },
    formatDate(val) {
      let date = new Date(
        val.stamp.seconds * 1000 + val.stamp.nanoseconds / 1000000
      );
      return `${date.getDate()}/${date.getMonth()}/${date.getYear()}`;
    },
    nextWeek() {
      this.weekIndex = Math.min(this.weekIndex + 7, this.trackData.length - 7);
      this.getWeekData();
    },
    prevWeek() {
      this.weekIndex = Math.max(this.weekIndex - 7, 0);
      this.getWeekData();
    },
    getWeekData() {
      this.weekData = this.trackData.slice(
        this.weekIndex,
        (this.weekIndex + 7) % 7
      );
    },
  },
  computed: {
    getAvgMoodLottie() {
      let emotion = "";
      let max = Math.max(
        this.getAvgMoodNeutral,
        this.getAvgMoodHappy,
        this.getAvgMoodAnxious,
        this.getAvgMoodAngry
      );
      if (max === this.getAvgMoodAngry) emotion = "angry";
      else if (max === this.getAvgMoodAnxious) emotion = "anxious";
      else if (max === this.getAvgMoodHappy) emotion = "happy";
      else if (max === this.getAvgMoodNeutral) emotion = "neutral";
      console.log(emotion);
      return this.emotionToAnimation(emotion);
    },
    getAvgMoodNeutral() {
      let neutral = this.trackData.reduce((prev, curr) => {
        return prev + Number(curr.neutral);
      }, 0);
      return neutral / this.trackData.length;
    },
    getAvgMoodHappy() {
      let happy = this.trackData.reduce((prev, curr) => {
        return prev + Number(curr.happy);
      }, 0);
      return happy / this.trackData.length;
    },
    getAvgMoodAnxious() {
      let anxious = this.trackData.reduce((prev, curr) => {
        return prev + Number(curr.anxious);
      }, 0);
      return anxious / this.trackData.length;
    },
    getAvgMoodAngry() {
      let angry = this.trackData.reduce((prev, curr) => {
        return prev + Number(curr.angry);
      }, 0);
      return angry / this.trackData.length;
    },
  },
};
</script>
