import { mount } from "@vue/test-utils";
import { AdvancedImage } from "../../src/index";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { nextTick } from "vue";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

describe("AdvancedImage.vue", () => {
  it("AdvancedImage should be truthy", () => {
    expect(AdvancedImage).toBeTruthy();
  });

  it("should create an img tag with src", async function () {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage },
    });

    // wait because @cloudinary/html takes time to update the img element
    await nextTick();

    expect(component.html()).toContain(
      '<img src="https://res.cloudinary.com/demo/image/upload/sample"'
    );
  });

  it("should add style to img component", async function () {
    const component = mount(AdvancedImage, {
      props: {
        style: "opacity: 0.5;",
        cldImg: cloudinaryImage,
      },
    });

    // wait because @cloudinary/html takes time to update the img element
    await nextTick();

    expect(component.html()).toContain('style="opacity: 0.5;"');
  });

  it("should cancel plugins on AdvancedImage unmount", function (done) {
    const plugins = [
      (
        _element: HTMLImageElement | HTMLVideoElement,
        _cldImage: CloudinaryImage,
        htmlPluginState: any
      ) => {
        return new Promise((resolve) => {
          htmlPluginState.cleanupCallbacks.push(() => {
            resolve("canceled");
          });
        }).then((res) => {
          expect(res).toBe("canceled");
          done();
        });
      },
    ];

    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins,
      },
    });

    component.unmount();
  });

  it("Should rerun plugins on props update", async function () {
    const mock = jest.fn();
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [mock] },
    });

    // plugins called once
    expect(mock).toHaveBeenCalledTimes(1);

    // trigger AdvancedImage.onUpdate
    await component.setProps({
      cldImg: cloudinaryImage,
      plugins: [mock],
      style: "color: blue;",
    });

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
