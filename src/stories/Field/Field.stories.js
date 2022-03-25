export default {
  title: "Field",
  color: {
    control: { type: "radio" },
    options: ["success", "warning", "danger", "primary", "secondary"],
  },
  size: {
    options: ["sm", "md", "lg", "xl"],
    control: {
      type: "radio",
      labels: {
        sm: "Small",
        md: "Medium",
        lg: "Large",
        xl: "Extra Large",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {},
  template: '<s-field  v-bind="$props"> <s-textbox ></s-textbox> </s-field>',
});

export const Primary = Template.bind({});

Primary.args = {
  label: "Username",
  size: "lg",
  color: "success",
  passwordToggle: false,
  beforeIcon: "IconIcRoundLockReset",
  afterIcon: "",
};
