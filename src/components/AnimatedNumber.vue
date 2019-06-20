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

    // how much to decrease the change with every update
    // since we divide by this number each time note that the
    // decay in change will be logarithmic
    'changeDecayRatio': {
      type: Number,
      default: 4
    },

    // minimum and maximum time update intervals
    // we will go from minimum to maximum time at a rate scaled by
    // the inverse of change
    'minIntervalTime': {
      type: Number,
      default: 20
    },
    'maxIntervalTime': {
      type: Number,
      default: 50
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
        let timeOut = this.minIntervalTime + (this.maxIntervalTime - this.minIntervalTime) / change
        window.setTimeout(this.updateDisplayValue, timeOut)
      }
    }
  },

  // initialize to target value on mount
  mounted () {
    this.displayValue = this.parsedValue
  },

  // call the update function when value changes
  watch: {
    value: function () {
      window.setTimeout(this.updateDisplayValue, this.minIntervalTime)
      this.$emit('started-update')
    }
  }
}
</script>
