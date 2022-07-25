import { AdvancedImage, accessibility } from "../../src/index";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

const waitTicks = async (ticks: number) => {
  for (let i = 0; i < ticks; i++) {
    await nextTick();
  }
};

describe("accessibility", () => {
  it("should apply default", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [accessibility()] },
    });

    // wait because plugin action takes time
    await waitTicks(2);

    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample"'
    );
  });

  it("should apply darkmode", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [accessibility({ mode: "darkmode" })],
      },
    });
    await waitTicks(2);
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample"'
    );
  });

  it("should apply brightmode", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [accessibility({ mode: "brightmode" })],
      },
    });
    await waitTicks(2);
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/co_white,e_colorize:40/sample"'
    );
  });

  it("should apply monochrome", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [accessibility({ mode: "monochrome" })],
      },
    });
    await waitTicks(2);
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/e_grayscale/sample"'
    );
  });

  it("should apply colorblind", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [accessibility({ mode: "colorblind" })],
      },
    });
    await waitTicks(2);
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/e_assist_colorblind/sample"'
    );
  });

  it("should default if supplied with incorrect mode", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [accessibility({ mode: "ddd" })],
      },
    });
    await waitTicks(2);
    expect(component.html()).toBe(
      '<img src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample">'
    );
  });
});
