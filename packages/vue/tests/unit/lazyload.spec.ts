import { AdvancedImage, lazyload } from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { mount } from "@vue/test-utils";
import { waitTicks } from "./utils";
import { testWithMockedIntersectionObserver } from "../../../../testUtils/testWithMockedIntersectionObserver";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

describe("lazy-load", () => {
  it("should not have src pre-scroll", async () => {
    const rootDiv = document.createElement("div");
    rootDiv.id = "root";
    const div = document.createElement("div");
    div.style.setProperty("height", "10000px");
    rootDiv.appendChild(div);
    document.body.appendChild(rootDiv);

    testWithMockedIntersectionObserver(
      // eslint-disable-next-line no-empty-pattern
      async (mockIntersectionEvent: ({}) => void) => {
        const component = mount(AdvancedImage, {
          props: { cldImg: cloudinaryImage, plugins: [lazyload()] },
          attachTo: "#root",
        });
        mockIntersectionEvent([
          { isIntersecting: false, target: component.element },
        ]);
        await waitTicks(2);
        // no src pre scroll
        expect(component.html()).toBe("<img>");
        expect(component.html()).not.toContain(
          'src="https://res.cloudinary.com/demo/image/upload/sample"'
        );
      }
    );
  });

  it("should have src when in view", async () => {
    testWithMockedIntersectionObserver(
      // eslint-disable-next-line no-empty-pattern
      async (mockIntersectionEvent: ({}) => void) => {
        const component = mount(AdvancedImage, {
          props: { cldImg: cloudinaryImage, plugins: [lazyload()] },
        });
        mockIntersectionEvent([
          { isIntersecting: true, target: component.element },
        ]);
        await waitTicks(2);

        expect(component.html()).toContain(
          'src="https://res.cloudinary.com/demo/image/upload/sample"'
        );
      }
    );
  });

  it("should set lazyload root margin and threshold", async () => {
    testWithMockedIntersectionObserver(
      // eslint-disable-next-line no-empty-pattern
      async (mockIntersectionEvent: ({}) => void) => {
        const component = mount(AdvancedImage, {
          props: {
            cldImg: cloudinaryImage,
            plugins: [lazyload({ rootMargin: "10px", threshold: 0.5 })],
          },
        });
        mockIntersectionEvent([
          { isIntersecting: true, target: component.element },
        ]);
        await waitTicks(2);
        expect(component.html()).toContain(
          'src="https://res.cloudinary.com/demo/image/upload/sample"'
        );
      }
    );
  });
});
