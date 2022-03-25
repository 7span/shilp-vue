import Component from "./Component";
export default {
  title: "Layout",
  components: Component,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  template: '<component  v-bind="$props"></component>',
});

export const Primary = Template.bind({});

Primary.args = {
  stack: true,
  group: false,
  color: "success",
  size: "md",
  align: "left",
  fluid: true,
  leftSize: "200px",
  rightSize: "500px",
  gap: 4,
};
