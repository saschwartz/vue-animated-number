<template>
  <div id="app">
    <el-header>
      <h2>Vue Animated Number</h2>
    </el-header>
    <el-main>
      <p>Input a number below and press submit to watch the animation change.</p>
      <p>You can also change the timing and change rate parameters to adjust the animation. The available control parameters are:</p>
      <div id='variable-descriptions'>
        <ul>
          <li><strong>startTimeInterval</strong> - controls the initial transition speed. The shorter the interval, the faster the numbers will tick to begin with.</li>
          <li><strong>endTimeInterval</strong> - controls the final transition speed. The shorter the interval, the faster the numbers will tick at the end of the animation.</li>
          <li><strong>changeDecayRatio</strong> - controls how big the steps are when the number changes. With each step, the change is divided by this number. </li>
        </ul>
      </div>

      <!-- form controls -->
      <div id="page-content">
        <div id="controls">
          <div class="slider">
            <span>startTimeInterval</span>
            <el-slider v-model="startTimeInterval" :min="0" :max="100"></el-slider>
          </div>
          <div class="slider">
            <span>endTimeInterval</span>
            <el-slider v-model="endTimeInterval" :min="50" :max="400"></el-slider>
          </div>
          <div class="slider">
            <span>changeDecayRatio</span>
            <el-slider v-model="changeDecayRatio" :min="2" :max="10"></el-slider>
          </div>
          <el-input placeholder="Input a new value" v-model="editableValue"></el-input>
          <el-button type="primary" @click="updateValue()">Animate</el-button>
        </div>
        <!-- the animated number component -->
        <div id="animated-number">
          <AnimatedNumber
            :value='parseFloat(value)'
            :startTimeInterval="startTimeInterval"
            :endTimeInterval="endTimeInterval"
            :changeDecayRatio="changeDecayRatio"
          />
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
      editableValue: 1324,
      startTimeInterval: 40,
      endTimeInterval: 170,
      changeDecayRatio: 5
    };
  },
  methods: {
    updateValue() {
      this.value = this.editableValue;
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
