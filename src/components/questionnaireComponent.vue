<script>
import { db } from "@/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const formGroups = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default {
  data() {
    return {
      activeTab: 0,
      rating_pick: 5,
      formGroups,
      formInput: {
        happy: null,
        angry: null,
        anxious: null,
        neutral: 0,
        stamp: null,
      },
    };
  },
  mounted() {
    this.rating_pick = 5;
  },
  methods: {
    getString() {
      switch (this.activeTab) {
        case 0:
          return "https://assets1.lottiefiles.com/packages/lf20_cehxtohr.json";
        case 1:
          return "https://assets4.lottiefiles.com/packages/lf20_SkHItGfvka.json";
        case 2:
          return "https://assets10.lottiefiles.com/private_files/lf30_qpfajs7r.json";
      }
    },
    async handleInput() {
      switch (this.activeTab) {
        case 0:
          this.formInput.happy = this.rating_pick * 10;
          break;
        case 1:
          this.formInput.angry = this.rating_pick * 10;
          break;
        case 2:
          this.formInput.anxious = this.rating_pick * 10;
          break;
      }
      if (this.activeTab !== 2) {
        this.activeTab++;
      } else {
        const docRef = doc(db, "users", this.$store.state.user.uid);
        const dbResp = await getDoc(docRef);
        const dbData = dbResp.data();
        const lastDate = new Date(dbData.moods.at(-1).stamp.n);
        console.log(dbData.moods.at(-1).stamp);
        console.log(typeof dbData.moods.at(-1).stamp);
        if (lastDate.getDate() === new Date().getDate()) {
          let moods = dbData.moods;
          moods.pop();
          await updateDoc(docRef, {
            moods: [
              ...moods,
              {
                ...this.formInput,
                stamp: new Date(),
              },
            ],
          });
        } else {
          await updateDoc(docRef, {
            moods: arrayUnion({
              ...this.formInput,
              stamp: new Date(),
            }),
          });
        }
      }
    },
  },
};
</script>

<template>
  <section class="rating">
    <div class="logo">
      <lottie-vue-player
        :src="getString()"
        :player-controls="false"
        style="display: block; width: 100%; height: 200px"
        :autoplay="true"
        :loop="true"
      >
      </lottie-vue-player>
    </div>
    <div class="intro">
      <p>
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </p>
    </div>

    <form name="select-rating" class="select-rating" @submit="onsubmit">
      <fieldset>
        <div
          v-for="formGroup in formGroups"
          :key="formGroup"
          class="form-group"
        >
          <input
            type="radio"
            name="rating"
            :id="formGroup"
            :value="formGroup"
            v-model="rating_pick"
          />
          <label :for="formGroup">{{ formGroup }}</label>
        </div>
      </fieldset>

      <span @click="handleInput">
        {{ activeTab != 2 ? "Next" : "Submit" }}
      </span>
    </form>
  </section>
</template>

<style lang="scss" scoped>
$Orange: hsl(25, 97%, 53%);
$White: hsl(0, 0%, 100%);
$Light-Grey: hsl(217, 12%, 63%);
$Medium-Grey: hsl(216, 12%, 54%);
$Dark-Blue: hsl(213, 19%, 18%);
$Very-Dark-Blue: hsl(216, 12%, 8%);

.rating {
  height: 100%;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .logo {
    border-radius: 50%;
    background: rgba($Medium-Grey, 0.1);
  }

  .intro {
    h1 {
      color: $White;
      font-size: 1.65em;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      line-height: 1.6;
      color: $Light-Grey;
      font-size: 1em;
    }
  }

  form.select-rating {
    display: grid;
    gap: 24px;

    fieldset {
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      div.form-group {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        position: relative;
        display: grid;
        place-items: center;

        label {
          color: $Medium-Grey;
          font-size: 1em;
          font-weight: 700;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba($Medium-Grey, 0.1);
          transition: 0.2s ease-in-out;
          cursor: pointer;
        }

        input {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;

          &:checked + label {
            background: $Orange;
            color: $White;
          }
        }

        &:hover label {
          background: $Light-Grey;
          color: $White;
        }
      }
    }

    span {
      outline: none;
      border: none;
      background: $Orange;
      color: $White;
      padding: 15px 0;
      border-radius: 99rem;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      text-align: center;
      width: 20vw;
      position: relative;
      left: 50%;

      &:hover {
        background: $White;
        color: $Orange;
      }
    }
  }
}
</style>
