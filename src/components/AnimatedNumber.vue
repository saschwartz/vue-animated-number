<template>

<!-- if we are formatting the value as html -->
<span v-if='html' v-html='formatter(displayValue)'></span>

<!-- otherwise just the bare value -->
<span v-else> {{ formatter(displayValue) }} </span>

</template>

<script>

export default {
  name: 'AnimatedNumber',
  props: {

    // the value to display
    'value': Number,

    // formatter function for the value, default is
    // to put commas every 3 digits and round number to 2 dp
    'formatter': {
      type: Function,
      default: x => (Math.round(x * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    // whether or not to render the value as html
    // maps to Vue's v-html directive
    'html': {
      type: Boolean,
      default: false
    },

    // a number from 1 - 10 of how quickly to animate the changes
    'speed': {
      type: Number,
      default: 5,
      validator: function (value) {
        if (value >= 1 && value <= 10) {
          console.warn('Prop "speed" for component  "AnimatedNumber" needs to be an integer between 1 and 10')
          return true
        } else {
          return false
        }
      }
    }
  },

  // initialize to 0
  data () {
    return {
      displayValue: 0
    }
  },

  // in case prop type check fails (e.g. a string is parsed)
  // try figure it out here
  computed: {
    parsedValue: function () {
      return parseFloat(this.value)
    },

    // will range from 60 => 150
    endTimeInterval: function () {
      return 50 + 100 / this.speed
    },

    // will range from 2 => 11
    changeDecayRatio: function () {
      return 1 + (10 / this.speed)
    }
  },

  // function to update the display value in an animated fashiion
  methods: {
    updateDisplayValue () {
      // if the difference is under one, set them equal to avoid asymptotic
      // approach (this can happen if the initial value is < 1)
      if (Math.abs(this.displayValue - this.parsedValue) < 1) { this.displayValue = this.parsedValue }

      // if the real value already matches the display one, return and emit event
      // this is the recursive base case
      if (this.parsedValue === this.displayValue) { this.$emit('finished-update') }

      // otherwise calculate value change and time interval, and make the recursive call
      else {
        // change is the current difference, divided by our ratio
        // this will result in logarithmic decay
        // note that we ensure to floor or ceiling the value depending on whether it
        // is negative or positive, in order to avoid asymptotic approaches
        let change = (this.parsedValue - this.displayValue) / this.changeDecayRatio
        change = change >= 0 ? Math.ceil(change) : Math.floor(change)
        this.displayValue += change

        // timeout is minInterval plus the difference to max interval, scaled by the
        // inverse of change. Thus we will begin at minInterval and eventually reach maxInterval
        let timeOut = 30 + (this.endTimeInterval - 30) / Math.abs(change)
        window.setTimeout(this.updateDisplayValue, timeOut)
      }
    }
  },

  // initialize to target value on mount
  mounted () {
    this.displayValue = this.parsedValue
  },

  // call the update function when value changes
  // also handle the case where we're going from an invalid value
  // to a valid one, by setting displayValue to 0
  watch: {
    value: function () {
      if (isNaN(this.displayValue)) { this.displayValue = 0}
      window.setTimeout(this.updateDisplayValue, 0)
      this.$emit('started-update')
    }
  }
}
</script>
