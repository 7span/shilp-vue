import Shimmer from "./Shimmer";
export default {
  title: "Shimmer",
  components: Shimmer,
  argTypes: {
    count: {
      name: "Shimmer",
      controls: {
        type: "number",
      },
      defaultValue: 5,
    },
  },
};

const Template = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Shimmer },
  template: '<shimmer v-bind="$props"/>',
});

export const Primary = Template.bind({});

Primary.args = {
  count: 10,
};
