import { mount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("checks whether label prop is set when passed", () => {
    const wrapper = mount(Button, {
      propsData: { label: "Log In" },
    });

    expect(wrapper.props().label).toBe("Log In");
  });
});
