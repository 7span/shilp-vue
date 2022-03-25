export default {
  title: "DropDown",
};

const Template = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: "<s-dropdown v-bind='$props'/>",
});
export const Primary = Template.bind({});

Primary.args = {
  placeholder: "Select Furniture",
  options: [
    {
      label: "Chair",
      value: "chair",
    },
    {
      label: "Table",
      value: "table",
    },
    {
      label: "Sofa",
      value: "sofa",
    },
  ],
};
