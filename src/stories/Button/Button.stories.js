import Button from "./Button";
export default {
  title: "Button",
  component: Button,
  // argTypes: {
  //   size: {
  //     description: "Size of Button",
  //     defaultValue: "lg",
  //     options: ["xs", "sm", "md", "lg", "xl"],
  //     control: {
  //       type: "radio",
  //       labels: {
  //         xs: "Extra Small",
  //         sm: "Small",
  //         md: "Medium",
  //         lg: "Large",
  //         xl: "Extra Large",
  //       },
  //     },
  //   },
  //   color: {
  //     description: "Color Options",
  //     defaultValue: "success",
  //     control: { type: "radio" },
  //     options: ["success", "warning", "danger", "primary", "secondary"],
  //   },
  //   // icon: {
  //   //   control: { type: "select" },
  //   //   options: icons,
  //   // },
  //   theme: {
  //     description: "Theme Style",
  //     defaultValue: "muted",
  //     control: { type: "radio" },
  //     options: ["link", "muted", "outline", "solid", "trn", "gradient", "tab"],
  //   },
  //   shape: {
  //     description: "Shape Options",
  //     defaultValue: "pill",
  //     control: { type: "radio" },
  //     options: ["pill", "circle", "square", "rectangle", "badge"],
  //   },
  //   disabled: {
  //     description: "Set True if button should not be Clicked.",
  //     defaultValue: false,
  //     control: { type: "boolean" },
  //   },
  //   loader: {
  //     description: "Show / Hide Loading Spinner while Data is on the way.",
  //     defaultValue: false,
  //     control: { type: "boolean" },
  //   },
  // },
};

// const Template = (args, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   components: { Button },
//   template: "",
// });

// export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Primary.args = {
//   label: "Shilp vue Button",
// };

export const Theme = () => ({
  components: { Button },
  template:
    '<div><s-button theme="muted" label="Muted" color="success"></s-button>\
    <s-button theme="solid" label="Solid" color="primary"></s-button>\
    <s-button theme="outline" label="Outline" color="danger"></s-button>\
    <s-button theme="link" label="Link" color="warning"></s-button>\
    <s-button theme="gradient" label="Gradient"></s-button>\
    <s-button theme="trn" label="Transparent"></s-button>\
    <s-button theme="tab" label="Tab" color="success"></s-button>\
    </div>',
});

export const colors = () => ({
  components: { Button },
  template:
    '<div><s-button label="Primary" color="primary"></s-button>\
              <s-button label="Secondary" color="secondary"></s-button>\
              <s-button label="Success" color="success"></s-button>\
              <s-button label="Danger" color="danger"></s-button>\
              <s-button label="Warning" color="warning"></s-button></div>',
});

export const Sizes = () => ({
  components: { Button },
  template:
    '<div><s-button  label="Extra Small" size="xs" color="success"></s-button>\
    <s-button  label="Small" size="sm" color="primary"></s-button>\
    <s-button  label="Medium" size="md" color="danger"></s-button>\
    <s-button  label="Large" size="lg" color="warning"></s-button>\
    <s-button  label="Extra Large" size="xl" color="success"></s-button>\
    </div>',
});

export const Shapes = () => ({
  components: { Button },
  template:
    '<div><s-button  label="Pill" shape="pill" color="success"></s-button>\
    <s-button label="Rectangle" shape="rectangle" color="primary"></s-button>\
    <s-button  label="Circle" shape="circle" color="danger"></s-button>\
    <s-button label="Square" shape="square" color="warning"></s-button>\
    <s-button label="Badge" shape="badge" color="success"></s-button>\
    </div>',
});

export const Loader = () => ({
  components: { Button },
  template:
    '<div><s-button  label="Pill" shape="pill" color="success" :loader="true"></s-button>\
    <s-button label="Rectangle" shape="rectangle" color="primary" :loader="true"></s-button>\
    <s-button  label="Circle" shape="circle" color="danger" :loader="true"></s-button>\
    <s-button label="Square" shape="square" color="warning" :loader="true"></s-button>\
    <s-button label="Badge" shape="badge" color="success" :loader="true"></s-button>\
    </div>',
});

export const Alignment = () => ({
  components: { Button },
  template:
    '<div><s-button  label="Center"  color="success" align="center"></s-button>\
    <s-button label="Left" color="primary" align="left"></s-button>\
    <s-button  label="Right" color="danger" size="lg" align="right"></s-button>\
    </div>',
});

export const Disabled = () => ({
  components: { Button },
  template:
    '<div><s-button  label="Disabled"  color="success" disabled></s-button>\
    <s-button label="Solid" color="primary" ></s-button>\
    </div>',
});
