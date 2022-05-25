import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Log In";
    const wrapper = shallowMount(Button, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
