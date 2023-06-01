<template>
  <main>
    <nav>
      <div class="left">
        <span>Hey, {{ user.displayName }}</span>
      </div>
      <div class="right">
        <span>Home</span>
        <span>Log out</span>
      </div>
    </nav>
    <div class="list">
      <h2>Find yourself a therapist today!!</h2>
      <div class="list-wrapper">
        <Doctor
          v-for="(doctor, index) in doctors"
          :key="index"
          :doctor="doctor"
          @click="changeDoctor(index)"
        />
      </div>
    </div>
    <div class="quote">
      “{{ quote }}” <br /><br />
      — {{ author }}
    </div>
    <div class="inst">
      <div class="info">
        <img :src="this.doctor.picture.large" alt="doctor ki sakal" />
        <div style="text-align: left">
          <span
            style="font-size: 20px; font-family: 'Podkova'; font-weight: 800"
          >
            {{
              ["Dr.", this.doctor.name.first, this.doctor.name.last].join(" ")
            }}
          </span>
          <p style="font-family: 'Podkova'; margin-top: 5px">
            <span>{{ this.doctor.email }}</span>
            <br />
            <span>{{ this.doctor.phone }}</span>
          </p>
        </div>
        <div style="text-align: left; margin-left: 10px">
          <p style="font-family: 'Podkova'">
            <span
              >{{ this.doctor.location.street.number }},{{
                this.doctor.location.street.name
              }}</span
            >
            <br />
            <span
              >{{ this.doctor.location.city }} -
              {{ this.doctor.location.state }}</span
            >
            <br />
            <span
              >{{ this.doctor.location.country }} -
              {{ this.doctor.location.postcode }}</span
            >
          </p>
        </div>
      </div>
      <GmapMap :center="center" :zoom="5" style="width: 100%; height: 320px">
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
        />
      </GmapMap>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  margin: 2em;
  padding: 1em;
  border: 4px solid #000000;

  display: grid;
  grid-template-rows: 50px 2fr 2fr;
  grid-template-columns: 1fr 1fr;

  gap: 1em;

  grid-template-areas:
    "nav nav"
    "list inst"
    "list inst"
    "list quote";

  height: calc(100vh - 6em);

  & nav {
    grid-area: nav;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-family: "Podkova";
      font-style: normal;
      font-weight: 400;
      font-size: 25px;
      text-align: center;

      color: #000000;

      margin-right: 20px;

      &:first-child {
        margin-left: 10px;
      }
    }
  }
  & .list {
    grid-area: list;
    background: #ffb6b6;
    border: 4px solid #000000;

    padding: 1em;

    & > h2 {
      font-family: "Podkova";
      font-size: 1.6em;
      text-align: center;
      text-align: left;
    }

    & .list-wrapper {
      overflow: scroll;
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100%;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    }
  }

  & .quote {
    grid-area: quote;
    background: #d8ddef;
    border: 4px solid #000000;

    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Podkova";
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  & .inst {
    grid-area: inst;
    background: #8ee5c2;
    border: 4px solid #000000;

    padding: 1em;

    font-family: "Podkova";
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 10px;

    .info {
      display: flex;
      align-items: center;

      img {
        border-radius: 90%;
        height: 90px;
        width: 100px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

<script>
import axios from "axios";
import Doctor from "@/components/doctors.vue";

export default {
  name: "doctor-view",
  components: {
    Doctor,
  },
  data() {
    return {
      author: "Lori Deschene",
      quote:
        "You don’t have to be positive all the time. It’s perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn’t make you a negative person. It makes you human.",
      doctors: [],
      selectedDoctor: 0,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    doctor() {
      return this.doctors[this.selectedDoctor];
    },
  },
  beforeMount() {
    this.get_quote_of_the_day();
    axios.get("http://127.0.0.1:5000/doctors").then((resp) => {
      console.log(resp);
      this.doctors = resp.data.doctors;
      let selectedDoctor = this.doctors[this.selectedDoctor];
      let doctorLocation = {
        lat: Number(selectedDoctor.location.latitude),
        lng: Number(selectedDoctor.location.longitude),
      };
      this.markers.push({ position: doctorLocation });
    });
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      this.markers.push({
        position: this.center,
        title: "Your location",
        opacity: 0.5,
      });
    });
  },
  methods: {
    get_quote_of_the_day() {
      fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((data) => {
          let quote = data[Math.floor(Math.random() * data.length)];
          if (quote.author == null) quote.author = "Unknown";
          this.quote = quote.text;
          this.author = quote.author;
        });
    },
    changeDoctor(index) {
      console.log("hi beetch");
      this.selectedDoctor = index;
      this.markers = [];

      this.markers.push({
        position: this.center,
        title: "Your location",
        opacity: 0.5,
      });
      let selectedDoctor = this.doctors[this.selectedDoctor];
      let doctorLocation = {
        lat: Number(selectedDoctor.location.latitude),
        lng: Number(selectedDoctor.location.longitude),
      };
      this.markers.push({ position: doctorLocation });
    },
  },
};
</script>
