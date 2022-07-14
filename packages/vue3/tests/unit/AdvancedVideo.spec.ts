import { shallowMount } from "@vue/test-utils";
import { AdvancedVideo as SrcAdvancedVideo } from "../../src/index";
import { AdvancedVideo as DistAdvancedVideo } from "../../dist/index.esm";

const AdvancedVideo =
  process.env.JEST_ENV === "DEV" ? SrcAdvancedVideo : DistAdvancedVideo;

describe("AdvancedVideo.vue", () => {
  it("renders props.url when passed", () => {
    const url = "https://res.cloudinary.com/demo/video/upload/dog.mp4";
    const wrapper = shallowMount(AdvancedVideo, {
      props: { url },
    });
    expect(wrapper.html()).toMatch(url);
  });
});
