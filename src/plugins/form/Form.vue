<template>
  <s-form-validate class="v-form" v-slot="scope" @submit="$emit('submit')">
    <slot name="header" :value="value" v-bind="scope" />

    <!-- Group -->
    <!--  By default the first interface will always be a group of fields. -->
    <sp-form-group
      key="v-form"
      :name="name"
      :config="config"
      :value="value"
      @input="input(arguments)"
    >
      <!-- Passdown Slots -->
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </sp-form-group>

    <slot name="footer" :value="value" v-bind="scope">
      <s-button type="submit" color="primary">Submit</s-button>
    </slot>
  </s-form-validate>
</template>

<script>
import { merge } from "lodash";
const settings = {
  defaults: {
    block: {
      size: {
        desktop: 6
      },
      gap: "2"
    }
  }
};

export default {
  props: {
    settings: Object,
    fields: Object,
    metaValue: Object,
    value: Object,
    callback: Object
  },

  data() {
    return {
      name: "v-form",
      config: {
        fields: this.fields
      }
    };
  },

  mounted() {
    this.$emit("init");
  },

  provide() {
    return {
      SETTINGS: merge(settings, this.settings)
    };
  },

  methods: {
    /**
     * Emits the final value
     * @param {Array} args
     * @param {Object} args[0] Contains all the fields and values.
     * @param {Array} args[1] The array of changed fields and its values.
     */
    input(args) {
      let value = args[0];
      let changed = [...args[1]]; //Cloning an array to remove reference;
      let metaValue = changed[changed.length - 1].metaValue;

      this.$emit("input", value);
      this.$emit("update:meta-value", metaValue);

      // If value is not set by the setValue function, emit the change event
      // This check will avoid infinite iteration on change and set-value
      let actions = changed.map(item => item.action);
      let emit = !actions.some(item => {
        return [
          "set-value",
          "repeater-default-value",
          "group-default-value"
        ].includes(item);
      });

      if (!emit) return;

      this.$emit("change", changed);
      //Excecute callback if provided
      changed.map(item => {
        if (this.callback && this.callback[item.field]) {
          this.callback[item.field]({
            setConfig: this.setConfig,
            setValue: this.setValue,
            changed: changed[0],
            changeList: changed
          });
        }
      });
    },

    /**
     * Both the methods emits the event at root level.
     * The field has a listner to find the required field and apply changes.
     */
    setConfig(field, key, value, index) {
      this.$root.$emit("v-form::set-config", {
        field,
        key,
        value,
        index
      });
    },
    setValue(field, value, index) {
      this.$root.$emit("v-form::set-value", { field, value, index });
    }
  }
};
</script>
