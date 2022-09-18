import { AdvancedImage } from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { mount } from "@vue/test-utils";
import { waitTicks } from "./utils";
import { SDKAnalyticsConstants } from "../../src/internal/SDKAnalyticsConstants";

const cloudinaryImage = new CloudinaryImage("sample", { cloudName: "demo" });

/**
 * Run test if condition is true
 * Otherwise act as passing test
 * @param condition
 * @param args
 */
const testIf = (condition: boolean, ...args: [string, () => void]) =>
  condition ? test(...args) : {};

describe("analytics", () => {
  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "creates an img with analytics using src",
    async () => {
      // Update src analytics value
      SDKAnalyticsConstants.sdkSemver = "1.0.0";
      SDKAnalyticsConstants.techVersion = "10.2.5";

      const component = mount(AdvancedImage, {
        props: { cldImg: cloudinaryImage },
      });
      await waitTicks(1);

      expect(component.html()).toEqual(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=ALAABDS0">'
      );
    }
  );

  testIf(
    process.env.VUE3_TEST_ENV === "DIST",
    "creates an img with analytics using dist",
    async () => {
      const component = mount(AdvancedImage, {
        props: { cldImg: cloudinaryImage },
      });
      await waitTicks(1);

      expect(component.html()).toEqual(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=ALCihDL0">'
      );
    }
  );
});
