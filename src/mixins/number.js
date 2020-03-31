export default {
  props: {
    value: Number,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    }
  },
  methods: {
    set(value) {
      if (value <= this.max && value >= this.min) {
        this.$emit("input", value);
      }
    },
    plus() {
      if (this.value < this.max) {
        this.$emit("input", this.value + 1);
      }
    },
    minus() {
      if (this.value > this.min) {
        this.$emit("input", this.value - 1);
      }
    }
  }
};
