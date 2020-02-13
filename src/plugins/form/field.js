import { merge, cloneDeep } from "lodash";
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: null
    },
    parentInterface: {
      type: String,
      default: null
    },
    parentValue: {
      default: null
    },
    parentMetaValue: {
      default: null
    }
  },

  data() {
    return {
      localConfig: {}
    };
  },

  computed: {
    /**
     * Get the <s-field> props by removing extra information
     * 'props' is the props for input field being used as slot inside <s-field>
     */
    fieldProps() {
      const props = cloneDeep(this.mergedConfig);
      delete props.props;
      delete props.interface;
      return this.mergedConfig;
    },

    mergedConfig() {
      const config = merge({}, this.config, this.localConfig);

      //Remove repeater configuration for child element.
      delete config.repeater;
      //Remove Default Values
      delete config.value;

      return config;
    },

    slotScopes() {
      return {
        value: this.value,
        metaValue: this.metaValue,
        config: this.mergedConfig,
        parentValue: this.parentValue,
        parentMetaValue: this.parentMetaValue,
        index: this.index
      };
    },

    /**
     * TODO: WHAT ABOUT NESTED SLOTS?
     * Slots to pass determines if the field should have any slot or not.
     * The <v-form> accepts the special kind of slots for the fields by name and index.
     * For example, if a field with name 'date' wants to add 'start' slot, you can use slot name 'start:date'
     * Inshort, you can extend the field's slots(start, end) by adding respective names
     */
    slotsToRender() {
      const slots = [];
      for (var key in this.$scopedSlots) {
        const [destination, field, index] = key.split(":");
        if (field == this.name) {
          const slot = {
            destination,
            key
          };
          if (this.index != undefined) {
            if (parseInt(this.index) == parseInt(index)) {
              slots.push(slot);
            }
          } else {
            slots.push(slot);
          }
        }
      }
      return slots;
    }
  },

  methods: {
    defaultValue(config) {
      if (config.value) {
        return config.value;
      } else if (config.repeater) {
        return [];
      } else if (config.fields) {
        return {};
      } else {
        return null;
      }
    },

    componentType(config) {
      //Repeater has priority over field grouping
      if (config.repeater) {
        return "sp-form-repeater";
      } else if (config.fields) {
        return "sp-form-group";
      } else {
        return "sp-form-field";
      }
    }
  }
};
