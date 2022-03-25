import Component from "./Component";
export default {
  title: "Field Validate",
  components: Component,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  template: '<component v-bind="$props"></component>',
});

export const Primary = Template.bind({});

Primary.args = {
  name: "User Name",
  rules: "required|min:9",
  placeholder: "Enter Name",
};
