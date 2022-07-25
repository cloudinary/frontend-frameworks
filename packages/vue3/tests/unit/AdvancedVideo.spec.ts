import { shallowMount } from "@vue/test-utils";
import { AdvancedVideo } from "../../dist/index.esm";

describe("AdvancedVideo.vue", () => {
  it("renders props.url when passed", () => {
    const url = "https://res.cloudinary.com/demo/video/upload/dog.mp4";
    const wrapper = shallowMount(AdvancedVideo, {
      props: { url },
    });
    expect(wrapper.html()).toMatch(url);
  });
});
