<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav>
    <div class="logo">Mindful Me</div>
    <div class="actions">
      <ul type="none">
        <li>
          <a href="#whyus" style="text-decoration: none">WHY US?</a>
        </li>
        <li>
          <a href="#services" style="text-decoration: none">SERVICES?</a>
        </li>
        <li>FAQ'S?</li>
        <li>CONTACT US?</li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid black;
  background-color: whitesmoke;
  height: 40px;
}

.logo {
  font-family: "Podvoka";
  font-size: 1em;
  color: #f96969;
  margin-left: 20px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.actions {
  width: 30%;
  font-size: 1em;
  font-family: "Podvoka";
  color: black;
}

.actions > ul > li {
  margin-right: 20px;
  font-weight: 700;
  transition: all 0.5s linear;
  color: black;
}

li {
  display: inline-block;
  justify-content: space-evenly;
  align-items: center;
  color: black;
}

li > a {
  color: black;
}
</style>
