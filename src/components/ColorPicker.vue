<template>
  <div class="color-picker" :style="{'--color-picker--size':size}">
    <div class="color-picker__row" v-for="(row,index) in thePalette" :key="`color-row--${index}`">
      <label class="color-picker__group">{{row.label}}</label>
      <div class="color-picker__colors">
        <button
          type="button"
          v-close-popover
          v-for="(color,colorIndex) in row.colors"
          :style="{backgroundColor:color.hex}"
          :class="`color-picker__color--${color.value}`"
          :title="color.label"
          :key="`color--${colorIndex}`"
          @click="input(color)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { colors, shades } from "../shilp";

export default {
  name: "s-color-picker",
  props: {
    palette: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "30px"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    value: String,
    mode: {
      type: String,
      default: "default"
    }
  },

  computed: {
    thePalette() {
      if (this.mode == "default") return this.defaultPalette;
      if (this.mode == "full") return this.fullPalette;
      return [];
    },

    fullPalette() {
      const palette = [];
      for (var groupName in colors) {
        const group = colors[groupName];
        group.forEach(color => {
          if (color == "light" || color == "dark") return;
          const colorShades = [];
          shades.forEach(shade => {
            colorShades.push({
              label:
                this.capitalizeFirstLetter(color) +
                " " +
                this.capitalizeFirstLetter(shade),
              hex: this.getCSSValue(this.getCSSVar(color, shade)),
              value: `${color}--${shade}`
            });
          });
          palette.push({
            label: this.capitalizeFirstLetter(color),
            colors: colorShades
          });
        });
      }
      palette.push({
        label: "nuetral",
        colors: [
          {
            label: "dark",
            hex: this.getCSSValue(this.getCSSVar("dark", "default")),
            value: "dark"
          },
          {
            label: "light",
            hex: this.getCSSValue(this.getCSSVar("light", "default")),
            value: "light"
          }
        ]
      });
      return palette;
    },

    defaultPalette() {
      const palette = [];
      for (var groupName in colors) {
        const group = colors[groupName];
        const groupColors = [];
        group.forEach(color => {
          groupColors.push({
            label: this.capitalizeFirstLetter(color),
            hex: this.getCSSValue(this.getCSSVar(color, "default")),
            value: color
          });
        });
        palette.push({
          label: this.capitalizeFirstLetter(groupName),
          colors: groupColors
        });
      }
      return palette;
    }
  },

  methods: {
    getCSSValue(varName) {
      return getComputedStyle(document.body).getPropertyValue(varName);
    },
    getCSSVar(color, shade) {
      return shade == "default"
        ? `--color--${color}`
        : `--color--${color}--${shade}`;
    },
    input(color) {
      this.$emit("input", color[this.valueKey], color);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-picker__row {
  + .color-picker__row {
    margin-top: --space(sm);
  }
}
.color-picker__colors {
  --color-picker--size: 30px;
  button {
    width: var(--color-picker--size);
    height: var(--color-picker--size);
    border: none;
    border-radius: 50%;
    transition: all 0.1s ease 0s;
    cursor: pointer;
    + button {
      margin-left: --space(xxs);
    }
    &:hover {
      transform: scale(0.8);
    }
  }
}
.color-picker__group {
  text-transform: uppercase;
  font-size: --font-size(h6);
  letter-spacing: 2px;
  color: --color(grey);
  display: block;
}
.color-picker__color--light {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
</style>