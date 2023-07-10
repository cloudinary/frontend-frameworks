import { mount } from "@vue/test-utils";
import { CloudinaryImage, CloudinaryVideo } from "@cloudinary/url-gen";
import { auto, vp9 } from "@cloudinary/url-gen/qualifiers/videoCodec";
import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { AdvancedVideo } from "../../src";
import { waitTicks } from "../unit/utils";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);
const cloudinaryVideo = new CloudinaryVideo(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

const cloudinaryVideoWithAnalytics = new CloudinaryVideo(
  "sample",
  { cloudName: "demo" },
  { analytics: true }
);

describe("AdvancedVideo", () => {
  it("AdvancedVideo should be truthy", () => {
    expect(AdvancedVideo).toBeTruthy();
  });

  it("should render video with default sources", async function () {
    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo },
    });
    // wait because @cloudinary/html takes time to update the img element
    await waitTicks(1);

    expect(component.html()).toContain(
      "<video>\n" +
        '  <source src="https://res.cloudinary.com/demo/video/upload/sample.webm" type="video/webm">\n' +
        '  <source src="https://res.cloudinary.com/demo/video/upload/sample.mp4" type="video/mp4">\n' +
        '  <source src="https://res.cloudinary.com/demo/video/upload/sample.ogv" type="video/ogg">\n</video>'
    );
  });

  it("should generate url sources with correct placement of extension and url analytics", async function () {
    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideoWithAnalytics },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      "https://res.cloudinary.com/demo/video/upload/sample.webm?_a="
    );
    expect(component.html()).toContain(
      "https://res.cloudinary.com/demo/video/upload/sample.ogv?_a="
    );
    expect(component.html()).toContain(
      "https://res.cloudinary.com/demo/video/upload/sample.mp4?_a="
    );
  });

  it("should render video with input sources", async function () {
    const sources = [
      {
        type: "mp4",
        codecs: ["vp8", "vorbis"],
        transcode: videoCodec(auto()),
      },
      {
        type: "webm",
        codecs: ["avc1.4D401E", "mp4a.40.2"],
        transcode: videoCodec(vp9()),
      },
    ];

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, sources },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      "<video>\n" +
        '  <source src="https://res.cloudinary.com/demo/video/upload/vc_auto/sample.mp4" type="video/mp4; codecs=vp8, vorbis">\n' +
        '  <source src="https://res.cloudinary.com/demo/video/upload/vc_vp9/sample.webm" type="video/webm; codecs=avc1.4D401E, mp4a.40.2">\n</video>'
    );
  });

  it("should pass video attributes", async function () {
    const component = mount(AdvancedVideo, {
      props: {
        cldVid: cloudinaryVideo,
        controls: true,
        autoplay: true,
        playsInline: false,
        loop: true,
        // muted: true,
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain('loop=""');
    expect(component.html()).not.toContain("playsinline");
    expect(component.html()).toContain('autoplay=""');
    expect(component.html()).toContain('controls=""');
    // TODO: There are some issues with muted attribute in Vue
    // expect(component.html()).toContain('muted=""');
  });

  it("should contain poster", async function () {
    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, poster: "www.example.com" },
    });
    await waitTicks(1);

    expect(component.html()).toContain('poster="www.example.com"');
  });

  it('should contain poster when "auto" is passed as cldPoster', async function () {
    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, cldPoster: "auto" },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      'poster="https://res.cloudinary.com/demo/video/upload/q_auto/f_jpg/so_auto/sample"'
    );
  });

  it("should contain poster when cloudinary image is passed as cldPoster", async function () {
    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, cldPoster: cloudinaryImage },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      'poster="https://res.cloudinary.com/demo/image/upload/sample"'
    );
  });

  it("should emit play event", async function () {
    const mockCallback = jest.fn();

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, play: mockCallback },
    });
    await waitTicks(1);

    component.find("video").trigger("play");
    await waitTicks(1);

    expect(component.emitted().play).toBeTruthy();
    // TODO: This assertion should be enabled
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should emit loadStart event", async function () {
    const mockCallback = jest.fn();

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, loadStart: mockCallback },
    });
    await waitTicks(1);

    component.find("video").trigger("loadstart");
    await waitTicks(1);

    expect(component.emitted().loadstart).toBeTruthy();
    // TODO: This assertion should be enabled
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should emit ended event", async function () {
    const mockCallback = jest.fn();

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, ended: mockCallback },
    });
    await waitTicks(1);

    component.find("video").trigger("ended");
    await waitTicks(1);

    expect(component.emitted().ended).toBeTruthy();
    // TODO: This assertion should be enabled
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should emit error event", async function () {
    const mockCallback = jest.fn();

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, error: mockCallback },
    });
    await waitTicks(1);

    component.find("video").trigger("error");
    await waitTicks(1);

    expect(component.emitted().error).toBeTruthy();
    // TODO: This assertion should be enabled
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should emit playing event", async function () {
    const mockCallback = jest.fn();

    const component = mount(AdvancedVideo, {
      props: { cldVid: cloudinaryVideo, playing: mockCallback },
    });
    await waitTicks(1);

    component.find("video").trigger("playing");
    await waitTicks(1);

    expect(component.emitted().playing).toBeTruthy();
    // TODO: This assertion should be enabled
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
