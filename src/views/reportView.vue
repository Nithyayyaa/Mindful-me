<template>
  <main>
    <div class="week">
      <h3>Week</h3>
      <h6>7th May - 14th May</h6>
      <div class="week-report">
        <span> <img src="@/assets/icons/arrow.png" alt="" /> </span>
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
            <h6 style="text-align: center">
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
          />
        </span>
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
      display: grid;
      grid-template-columns: 1fr repeat(7, 2fr) 1fr;
      gap: 1em;
      border: 2px solid #f96969;
      border-radius: 20px;
      place-items: center;

      padding: 20px;

      span {
        background-color: #f96969;
        border-radius: 100%;
        height: 70px;
        width: 70px;

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
  }
}
</style>
<script>
export default {
  data() {
    return {
      trackData: [
        { happy: 50, angry: 70, anxious: 70, neutral: 20, stamp: new Date() },
        { happy: 20, angry: 20, anxious: 60, neutral: 80, stamp: new Date() },
        { happy: 30, angry: 60, anxious: 20, neutral: 40, stamp: new Date() },
        { happy: 60, angry: 40, anxious: 80, neutral: 80, stamp: new Date() },
        { happy: 90, angry: 0, anxious: 70, neutral: 10, stamp: new Date() },
        { happy: 0, angry: 10, anxious: 70, neutral: 10, stamp: new Date() },
        { happy: 50, angry: 20, anxious: 50, neutral: 50, stamp: new Date() },
      ],
    };
  },
  methods: {
    maxEmotion(input) {
      let keys = Object.values(input);
      keys.pop();
      let max = Math.max(...keys);
      return Object.keys(input).filter((el) => input[el] === max)[0];
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
      let date = val.stamp;
      return `${date.getDate()}/${date.getMonth()}/${date.getYear()}`;
    },
  },
};
</script>
