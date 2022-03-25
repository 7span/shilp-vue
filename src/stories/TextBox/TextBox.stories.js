export default {
  title: "TextBox",
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {},
  template: '<s-textbox v-bind="$props"></s-textbox>',
});

export const Primary = Template.bind({});

Primary.args = {
  type: "number",
  placeholder: "Enter Number",
};
