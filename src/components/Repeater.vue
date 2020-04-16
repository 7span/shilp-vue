<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
    wrapper: {
      type: String,
    },
    wrapperAttrs: {
      type: Object,
    },
  },
  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newValue) {
      this.localCount = newValue;
    },
  },
  render(h) {
    const nodes = [];
    for (var i = 0; i < this.localCount; i++) {
      nodes.push(
        this.$scopedSlots.default({
          index: i,
        })
      );
    }
    return h(this.wrapper || "div", { props: this.wrapperAttrs }, nodes);
  },
  methods: {
    add() {
      this.localCount++;
    },
  },
};
</script>
