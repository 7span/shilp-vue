<template>
  <s-field :label="isLabel ? label : false" class="group" v-bind="fieldProps">
    <s-row :gap="SETTINGS.defaults.block.gap">
      <s-column
        v-for="(fieldConfig, fieldName) in config.fields"
        v-show="!fieldConfig.hide"
        :size="blockSize(fieldConfig)"
        :class="[blockClasses(fieldName, fieldConfig)]"
        :key="`group-${fieldName}`"
      >
        <!-- Field
        Need to keep the top level group's child interfaces as null to manage lable displays.-->
        <component
          :is="componentType(fieldConfig)"
          :key="fieldName"
          :name="fieldName"
          :config="fieldConfig"
          :index="index"
          :value="groupValue && groupValue[fieldName]"
          :parent-interface="name == 'v-form' ? null : 'group'"
          :parent-value="groupValue"
          :parent-meta-value="groupMetaValue"
          @setGroupConfig="$emit('setRepeaterConfig', $event)"
          @input="input(arguments, fieldName)"
        >
          <!-- Passdown Slots 3 -->
          <template
            v-for="slot in Object.keys($scopedSlots)"
            v-slot:[slot]="scope"
          >
            <slot :name="slot" v-bind="scope" />
          </template>
        </component>
      </s-column>
    </s-row>

    <!-- Passdown Slots -->
    <template v-for="slot in slotsToRender" v-slot:[slot.destination]="scope">
      <slot :name="slot.key" v-bind="{ ...scope, ...slotScopes }" />
    </template>
  </s-field>
</template>

<script>
import { cloneDeep, startCase } from "lodash";
import field from "./field";

export default {
  inject: ["SETTINGS"],

  mixins: [field],

  props: {
    value: Object,
    metaValue: Object,
    index: Number
  },

  data() {
    const groupValue = cloneDeep(this.value || {});
    const groupMetaValue = cloneDeep(this.metaValue || {});
    return {
      //Will contain local values of group
      groupValue: groupValue,
      groupMetaValue: groupMetaValue
    };
  },

  created() {
    this.setDefaultValues();
  },

  // Need to watch the values if changed in parent
  // Because group values are maintained locally
  watch: {
    value(nv) {
      this.$set(this, "groupValue", nv);
    },
    metaValue(nv) {
      this.$set(this, "groupMetaValue", nv);
    }
  },

  computed: {
    isLabel() {
      // Hide if it is the top level group
      // If index is provided, the repeater has already displayed the label.
      return this.name != "v-form" && this.index == null;
    },
    label() {
      return startCase(this.name);
    }
  },

  methods: {
    /**
     * Sets the default values of all the keys defined in the fields object.
     * Default values for diffrent type of fields: repeater = [], group = {}, normal = null
     */
    setDefaultValues() {
      for (var field in this.config.fields) {
        let val = this.defaultValue(this.config.fields[field]);
        this.$set(this.groupValue, field, val);
        //Always contain value inside value key in metaValues
        this.$set(this.groupMetaValue, field, {
          value: val
        });
      }

      //The changed object is always required to emit as 2nd argument.
      let changed = [
        {
          field: this.name,
          action: "group-default-value",
          value: this.groupValue,
          metaValue: this.groupMetaValue
        }
      ];
      this.$emit("input", this.groupValue, changed);
    },

    /**
     * On the input of child fields, merges the values in local values and emits the merged value.
     * @param {Array} args Contains 2 values. 1st is original value, 2nd is metaValue
     * @param {String,Object,Array} args[0] The field value
     * @param {Array} args[1] The array of changed fields and its values.
     */
    input(args, name) {
      let value = args[0];
      let changed = [...args[1]]; //Cloning an array to remove reference;

      // Merging the original value
      this.$set(this.groupValue, name, value);

      // Merging the meta value
      this.$set(
        this.groupMetaValue,
        name,
        changed[changed.length - 1].metaValue
      );

      changed.push({
        field: this.name,
        action: "group-input",
        value: this.groupValue,
        metaValue: this.groupMetaValue,
        index: this.index
      });

      this.$emit("input", this.groupValue, changed);
    },

    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    blockClasses(name) {
      let classes = [`block--${name}`];
      return classes;
    },

    blockSize(config) {
      if (config.block && config.block.size) {
        return config.block.size;
      } else {
        return this.SETTINGS.defaults.block.size;
      }
    }
  }
};
</script>
