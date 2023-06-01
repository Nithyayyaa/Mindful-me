<template>
  <div>
    <Navbar />
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
        <h1 id="whyus">Why Us?</h1>
        <h6>
          Welcome to our all-in-one mental wellness hub! Our web app combines
          the power of mood tracking, a treasure trove of articles and
          newsletters, and seamless connections with trusted mental health
          professionals. Track your moods, gain valuable insights, and discover
          expert guidance to enhance your well-being. Uncover the tools you need
          to nurture your mind, all in one convenient place."
        </h6>
      </div>
    </section>
    <section class="services">
      <h6 id="services">Services</h6>
      <h2>Check out the great services we offer</h2>
      <hr />
      <div class="services-grid">
        <div class="service">
          <img src="" alt="" />
          <h6>Mood Tracker</h6>
          <p>
            The mood tracking feature allows you to regularly record and monitor
            your emotions, providing insights into your mental well-being over
            time.
          </p>
        </div>
        <div class="service">
          <img src="" alt="" />
          <h6>Articles and Newsletter</h6>
          <p>
            The app provides a dedicated section where you can access a wide
            range of articles, blogs, and newsletters related to mental health.
          </p>
        </div>
        <div class="service">
          <img src="" alt="" />
          <h6>Connect with Professionals</h6>
          <p>
            The web app offers a platform for you to connect with licensed
            mental health professionals.You can Browse through a directory of
            professionals and connect with them.
          </p>
        </div>
      </div>
    </section>
    <section class="faq">
      <h6 id="faq">F.A.Q.</h6>
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
      <h6 id="contact">Contact Us</h6>
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
      font-weight: 800;
      font-size: 60px;
      color: #000;
      line-height: 89px;
      text-align: center;
    }
    h6 {
      font-family: "Podkova";
      margin-bottom: 40px;
      font-weight: 200;
      color: #000;
      font-size: 20px;
      line-height: 30px;
      text-align: justify;
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
    background: whitesmoke;
    color: black;
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
        font-size: 21px;
        line-height: 29px;
        text-align: center;
        color: #f96969;
        margin-bottom: 10px;
      }

      p {
        font-family: "Podkova";
        font-size: 17px;
        margin-left: 10px;
        font-weight: 400;
        margin-right: 10px;
        text-align: justify;
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
  font-size: 1.1em;
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
import Navbar from "@/components/navbar.vue";
const faqs = [
  {
    question: "What is Mindful Me?",
    answer:
      "Mindful Me aims to provide a comprehensive platform for users to track their mood, connect with mental health professionals, and access valuable resources such as blogs and newsletters. It's designed to support mental well-being and offer tools for self-reflection and professional guidance.",
  },
  {
    question: "How does the mood tracking feature work?",
    answer:
      "The mood tracking feature allows users to regularly record and monitor their emotions, providing insights into their mental well-being over time. Users can rate their mood on a scale or choose from predefined categories, add notes, and track patterns or trends. The app may also offer visualizations and analytics to help users better understand their mood fluctuations.",
  },
  {
    question:
      "Can I connect with mental health professionals through this web app?",
    answer:
      "Yes, our web app provides a platform for users to connect with licensed mental health professionals. You can browse through a directory of professionals, read their profiles, and choose someone who matches your needs. The app may offer options for scheduling appointments or conducting virtual sessions, depending on the availability of the professionals.",
  },
  {
    question:
      "Are the mental health professionals on the platform qualified and certified?",
    answer:
      "We strive to ensure that all mental health professionals listed on our platform are qualified, certified, and licensed to practice in their respective fields. However, it's essential for users to conduct their own due diligence when selecting a professional and verify their credentials before engaging in any services.",
  },
  {
    question:
      "Can I read blogs and newsletters related to mental health on this web app?",
    answer:
      "Absolutely! Our web app provides a dedicated section where users can access blogs, articles, and newsletters covering a wide range of mental health topics. These resources are curated by professionals and experts to provide valuable insights, tips, and advice for maintaining mental well-being.",
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
    Navbar,
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
