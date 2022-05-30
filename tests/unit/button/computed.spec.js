import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";
import Vue from "vue";
describe("Button.vue", () => {
  let wrapper = null;

  beforeAll(() => {
    /* Runs before all tests */

    wrapper = shallowMount(Button);
  });
  afterAll(() => {
    /* Runs after all tests */

    wrapper.destroy();
  });

  it("checks whether button is Disabled when disabled attribute is passed", async () => {
    wrapper = shallowMount(Button);
    wrapper.setProps({
      disabled: true,
    });

    await Vue.nextTick();

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it("checks whether component computed property sets to label when badge is true", async () => {
    wrapper = shallowMount(Button);
    wrapper.setProps({ badge: true });

    await Vue.nextTick();

    expect(wrapper.vm.component).toBe("label");
  });

  it("checks whether component computed property sets to Button if badge is false and no href is passed", async () => {
    wrapper = shallowMount(Button);
    await Vue.nextTick();

    expect(wrapper.vm.component).toBe("button");
  });
});
