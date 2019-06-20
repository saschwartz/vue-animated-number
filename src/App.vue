<template>
  <div id="app">
    <el-header>
      <h2>Vue Animated Number</h2>
    </el-header>
    <el-main>
      <p>Input a number below and press submit to watch the animation change.</p>
      <p>You can also change the animation speed.</p>

      <!-- form controls -->
      <div id="page-content">
        <div id="controls">
          <div class="slider">
            <span>Animation Speed</span>
            <el-slider v-model="speed" :min="1" :max="10"></el-slider>
          </div>
          <el-button type="primary" @click="updateValue()">Animate</el-button>
        </div>
        <!-- the animated number component -->
        <div id="animated-number">
          <AnimatedNumber :value='parseFloat(value)' :speed='speed'/>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import AnimatedNumber from "./components/AnimatedNumber.vue";
export default {
  components: {
    AnimatedNumber
  },
  data: function() {
    return {
      value: 0,
      speed: 5,
    };
  },
  methods: {
    updateValue() {
      this.value = Math.floor((Math.random() * 10000) + 0);
    }
  },
  mounted() {
    window.setTimeout(this.updateValue, 600);
  }
};
</script>

<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-main {
  margin: 0 auto;
  max-width: 650px;
}

#page-content {
  display: flex;
  padding-top: 2rem;
  justify-content: space-between;
}

#controls {
  text-align: center;
  width: 100%;
}

#variable-descriptions {
  text-align: left;
  font-size: 0.9rem;
}

.el-input {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

#animated-number {
  width: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 2rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
