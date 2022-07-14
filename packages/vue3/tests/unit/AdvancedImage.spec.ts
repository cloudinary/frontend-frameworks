import { shallowMount } from "@vue/test-utils";
import { AdvancedImage as SrcAdvancedImage } from "../../src/index";
import { AdvancedImage as DistAdvancedImage } from "../../dist/index.esm";

const AdvancedImage =
  process.env.JEST_ENV === "DEV" ? SrcAdvancedImage : DistAdvancedImage;

describe("AdvancedImage.vue", () => {
  it("renders props.url when passed", () => {
    const url = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    const wrapper = shallowMount(AdvancedImage, {
      props: { url },
    });
    expect(wrapper.html()).toMatch(url);
  });
});
