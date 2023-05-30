<template>
  <article @click="$emit('click')">
    <img :src="doctor.picture.medium" alt="" />
    <div>
      <h4>
        {{ doctorName }}
        <ion-icon
          :name="doctor.gender == 'female' ? 'female' : 'male'"
          :class="doctor.gender == 'female' ? 'pink' : 'blue'"
        ></ion-icon>
      </h4>
      <div>
        <ion-icon class="icons" name="call"></ion-icon>
        <ion-icon class="icons" name="mail"></ion-icon>
        <ion-icon class="icons" name="navigate"></ion-icon>
      </div>
      <p>{{ doctor.location.state }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
article {
  display: flex;
  align-items: center;
  gap: 1em;

  padding: 10px;
  border-radius: 10px;

  font-family: "Podkova";

  margin: 1em 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid #ff5353;
  }

  img {
    border-radius: 100%;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 72px;
  }

  .icons {
    font-size: 1em;
    margin-right: 0.5em;
    color: rgb(237, 63, 63);
    cursor: pointer;
  }

  p {
    color: rgb(237, 63, 63);
  }
}
</style>

<script>
export default {
  name: "doctor-card",
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    doctorName() {
      return ["Dr.", this.doctor.name.first, this.doctor.name.last].join(" ");
    },
  },
};
</script>
