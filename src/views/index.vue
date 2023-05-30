<template>
  <div>
    <section class="hero">
      <div class="left">
        <h1>MINDFUL ME</h1>
        <h6>One stop shop for your mental health needs</h6>
        <button @click="login">get started</button>
      </div>
      <div class="right">
        <img src="../assets/images/index-hero.png" alt="landing" />
      </div>
    </section>
    <section class="hero hero-2">
      <div class="right">
        <img src="../assets/images/hero-2.png" alt="landing" />
      </div>
      <div class="left">
        <h1>Why Us?</h1>
        <h6>
          The only application out there that let’s you track your mood and
          connect with mental health professionals out there!
        </h6>
      </div>
    </section>
    <section class="services">
      <h6>Services</h6>
      <h2>Check out the great services we offer</h2>
      <hr />
      <div class="services-grid">
        <div class="service">
          <img src="" alt="" />
          <h6>mood tracker</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
            distinctio?
          </p>
        </div>
        <div class="service">
          <img src="" alt="" />
          <h6>articles and newsletter</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
            distinctio?
          </p>
        </div>
        <div class="service">
          <img src="" alt="" />
          <h6>connect with professionals</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
            distinctio?
          </p>
        </div>
      </div>
    </section>
    <section class="faq">
      <h6>F.A.Q.</h6>
      <h2>Frequently Asked Questions</h2>
      <hr />
      <FAQ
        v-for="(faq, index) in faqs"
        :key="index"
        :question="faq.question"
        :answer="faq.answer"
      />
    </section>
    <section class="contact">
      <h6>Contact</h6>
      <h2>Get in touch with us</h2>
      <hr />
      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" /><br />
        <textarea placeholder="Message" id=""></textarea>
        <button>connect</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@mixin button {
  font-family: "Podkova";
  font-style: italic;
  font-weight: 700;
  font-size: 20px;
  line-height: 33px;
  text-align: center;

  text-transform: capitalize;

  padding: 8px 15px;

  background: transparent;

  border: 4px solid #000;

  background: #f96969;
  color: whitesmoke;

  min-width: 130px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 7px;

  cursor: pointer;
}

@mixin section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f5f5f5;
  min-height: 60vh;
  border-bottom: 4px solid #000;

  h2 {
    font-family: "Podkova";
    font-weight: 700;
    font-size: 40px;
    line-height: 49px;
    text-align: center;
  }
  h6 {
    font-family: "Podkova";
    font-weight: 700;
    font-size: 25px;
    line-height: 29px;
    text-align: center;
    color: #f96969;
  }

  hr {
    margin-top: 20px;
    width: 5vw;
    border-top: 2px solid #f96969;
  }
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 80vh;
  width: 100%;
  background: rgba(255, 182, 182, 0.3);
  border-bottom: 4px solid #000;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 100px;
    h1 {
      font-family: "Podkova";
      font-weight: 700;
      font-size: 80px;
      line-height: 89px;
      text-align: center;
    }
    h6 {
      font-family: "Podkova";
      font-weight: 700;
      font-size: 25px;
      line-height: 44px;
      text-align: center;
    }

    button {
      @include button;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.hero-2 {
    background: white;
    .left {
      padding-left: 0;
      align-items: center;
      padding-right: 100px;
    }
  }
}

.services {
  @include section;
  background: rgba(142, 229, 194, 0.3);

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 300px);
    grid-template-rows: 200px;
    gap: 5em;
    margin-top: 3em;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      -webkit-box-shadow: 13px 16px 46px -37px rgba(0, 0, 0, 0.74);
      -moz-box-shadow: 13px 16px 46px -37px rgba(0, 0, 0, 0.74);
      box-shadow: 13px 16px 46px -37px rgba(0, 0, 0, 0.74);
      border-radius: 10px;
      transition: all 150ms linear;

      h6 {
        text-transform: capitalize;
        font-family: "Podkova";
        font-weight: 700;
        font-size: 20px;
        line-height: 29px;
        text-align: center;
        color: #f96969;
        margin-bottom: 10px;
      }

      p {
        font-family: "Podkova";
        font-size: 15px;
        text-align: center;
        color: #656565;
      }

      &:hover {
        border-bottom: 4px solid #f96969;
      }
    }
  }
}

.faq {
  @include section;
  padding: 25px;
}

.contact {
  @include section;
  background: rgba(236, 182, 95, 0.3);

  input {
    margin: 10px;
    padding: 5px;
    width: 250px;
    height: 30px;
    border: 2px solid #f96969;
  }

  input::placeholder {
    color: #f96969;
  }

  textarea {
    margin: 10px;
    padding: 5px;
    width: calc(100% - 33px);
    height: 100px;
    border: 2px solid #f96969;
  }

  textarea::placeholder {
    color: #f96969;
  }

  button {
    @include button;
    margin: 10px;
  }
}
</style>
<script>
const faqs = [
  {
    question: "What is Mindful Me?",
    answer: "Mindful Me is a one stop shop for your mental health needs.",
  },
  {
    question: "What is Mindful Me?",
    answer: "Mindful Me is a one stop shop for your mental health needs.",
  },
  {
    question: "What is Mindful Me?",
    answer: "Mindful Me is a one stop shop for your mental health needs.",
  },
  {
    question: "What is Mindful Me?",
    answer: "Mindful Me is a one stop shop for your mental health needs.",
  },
  {
    question: "What is Mindful Me?",
    answer: "Mindful Me is a one stop shop for your mental health needs.",
  },
];

import { auth, db } from "@/firebaseConfig.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import FAQ from "@/components/faq.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index Page",
  data() {
    return {
      faqs,
    };
  },
  components: {
    FAQ,
  },
  methods: {
    async login() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          console.log(token);
          const userDoc = doc(db, "users", result.user.uid);
          const userData = await getDoc(userDoc);
          if (!userData.exists()) {
            console.log("hi");
            await setDoc(userDoc, { moods: [] });
          }
          await this.$store.dispatch("login", this.user);
          this.$router.push("/home");
        })
        .catch(console.error);
    },
  },
};
</script>
