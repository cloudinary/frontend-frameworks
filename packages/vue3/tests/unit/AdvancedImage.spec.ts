import { shallowMount } from "@vue/test-utils";
import { AdvancedImage } from "../../src/index";

describe("AdvancedImage.vue", () => {
  it("renders props.url when passed", () => {
    const url = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    const wrapper = shallowMount(AdvancedImage, {
      props: { url },
    });
    expect(wrapper.html()).toMatch(url);
  });
});
