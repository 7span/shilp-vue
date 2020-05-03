<template>
  <s-field-validate
    :name="name"
    :label="isLabel ? label : false"
    :class="fieldClasses"
    v-bind="fieldProps"
  >
    <!-- Interface
      Extract all the configuration from this point to interface.
      This will help directly apply HTML attributes on interfaces if not accepted as props.-->
    <component
      :name="name"
      :is="`s-${mergedConfig.interface}`"
      v-bind="{ ...interfaceProps }"
      :value="value"
      :index="index"
      @loading="loading = $event"
      @input="input(arguments, { action: 'input' })"
    >
    </component>

    <!-- Passdown Slots -->
    <template v-for="slot in slotsToRender" v-slot:[slot.destination]="scope">
      <slot :name="slot.key" v-bind="{ ...scope, ...slotScopes }" />
    </template>
  </s-field-validate>
</template>

<script>
import { set, cloneDeep, startCase } from "lodash-es";
import field from "./field";

export default {
  mixins: [field],
  props: {
    value: {
      default: null
    },
    index: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      metaValue: null
    };
  },

  created() {
    this.$root.$on("v-form::set-config", data => this.setConfig(data));
    this.$root.$on("v-form::set-value", data => this.setValue(data));
  },

  computed: {
    interfaceProps() {
      if (["repeater", "group"].includes(this.mergedConfig.interface)) {
        return this.mergedConfig;
      } else {
        return this.mergedConfig.props;
      }
    },

    isLabel() {
      //If the index is defined, the label should be displayed at repeater level
      if (this.parentInterface == "repeater") {
        return false;
      } else if (
        this.parentInterface == "group" &&
        this.index != null &&
        this.index != 0
      ) {
        return false;
      }
      return true;
    },

    label() {
      if (this.mergedConfig.label) {
        return this.mergedConfig.label;
      } else {
        return startCase(this.name);
      }
    }
  },

  methods: {
    fieldClasses() {
      let classes = [`field--${this.config.interface}`];
      if (this.state == "invalid") classes.push("field--danger");
      if (this.state == "valid") classes.push("field--success");
      if (this.loading) classes.push("field--loading");
      return classes;
    },

    /**
     * @param {Array} args
     * @param {String, Object, Array} args[0] The actual value of the field
     * @param {Object} args[1] The object contains the metadata of currently selected value.
     * @param {Object} info Extra information about the field
     * @param {String} info.action Describes how the event was triggered.
     */
    input(args, { action }) {
      let value = args[0];
      this.metaValue = args[1];
      // changed contains an array of events to notify how many fields were changed when any of the field updates.
      // It helps to track changes in repeater fields & group fields.
      var changed = [
        {
          field: this.name,
          action: action,
          value: value,
          metaValue: this.metaValue,
          index: this.index
        }
      ];
      this.$emit("input", value, changed);
    },

    /**
     * Updates the value of the field.
     * @param {Object} data
     * @param {String} data.field The field name to update value of.
     * @param {String,Number} data.value The value to set of field.
     * @param {Number} data.index If the field is child of repeater, index can be used to update that value only.
     */
    setValue({ field, value, index }) {
      if (field !== this.name) return;
      if (index == null || index == undefined || index == this.index) {
        this.input([value, { value }], { action: "set-value" });
      }
    },

    /**
     * Updates the configuration of a field.
     * If the index is provided and field is child of repeater, only that index will updated.
     * If not, will update all exisiting fields.
     * @param {Object} data
     * @param {String} data.field The field name to update config of.
     * @param {String} data.key Which key of a config object to update.
     * @param {String} data.type Defines the top level of config key if the change is needed to be made in child keys
     * @param {String,Number} data.value Value to set of provided key
     * @param {Number} data.index If the field is child of repeater, index can be used to update that value only.
     */
    setConfig({ field, key, value, index }) {
      if (field !== this.name) return;
      if (index == null || index == undefined || index == this.index) {
        const config = cloneDeep(this.localConfig);
        set(config, key, value);

        this.$set(this, "localConfig", config);
      }
      //Make sure the upcoming repeater fields also inherit the updated configuration.
      if (index == null) {
        //For repeater, no need to send the field param as config is related to this field only.
        if (this.parentInterface == "repeater") {
          this.$emit("setRepeaterConfig", { key, value });
        }
        //For group, a field is required to pass to identify which field to update in a group
        if (this.parentInterface == "group") {
          this.$emit("setGroupConfig", { field, key, value });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.field__group {
  > .blocks {
    flex: 1 1 auto;
  }
}
</style>
