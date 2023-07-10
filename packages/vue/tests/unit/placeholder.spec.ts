import { AdvancedImage, placeholder } from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { PLACEHOLDER_IMAGE_OPTIONS } from "../../../html/src/utils/internalConstants";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { mount } from "@vue/test-utils";
import { waitTicks } from "./utils";

describe("placeholder", () => {
  let cloudinaryImage: CloudinaryImage;

  const mockImage = {
    src: null,
    onload: () => {},
    onerror: () => {},
  };
  beforeEach(() => {
    // @ts-ignore
    window.Image = function () {
      return mockImage;
    };
    cloudinaryImage = new CloudinaryImage(
      "sample",
      { cloudName: "demo" },
      { analytics: false }
    );
  });
  it("should apply default", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [placeholder()] },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`
    );
  });

  it("should apply 'vectorize'", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder({ mode: "vectorize" })],
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`
    );
  });

  it("should apply pixelate", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder({ mode: "pixelate" })],
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample"`
    );
  });

  it("should apply blur", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder({ mode: "blur" })],
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample"`
    );
  });

  it("should apply predominant-color", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder({ mode: "predominant-color" })],
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS["predominant-color"]}/sample"`
    );
  });

  it("should default if supplied with incorrect mode", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder({ mode: "ddd" })],
      },
    });
    await waitTicks(1);

    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`
    );
  });

  it("should append placeholder transformation", async () => {
    cloudinaryImage.effect(sepia());
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [placeholder()],
      },
    });

    await waitTicks(2);
    expect(component.html()).toContain(
      `src="https://res.cloudinary.com/demo/image/upload/e_sepia/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample"`
    );
  });

  it("should not fail on error", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [placeholder()] },
    });
    // @ts-ignore
    component.element.onload(); // simulate element onload
    mockImage.onerror(); // simulate image onerror

    await waitTicks(2);
    expect(mockImage.src).toBe(
      "https://res.cloudinary.com/demo/image/upload/sample"
    );
  });
});
