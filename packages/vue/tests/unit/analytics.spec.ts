import { AdvancedImage } from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { mount } from "@vue/test-utils";
import { testIf, waitTicks } from "./utils";
import { SDKAnalyticsConstants } from "../../src/internal/SDKAnalyticsConstants";

const cloudinaryImage = new CloudinaryImage("sample", { cloudName: "demo" });

describe("analytics", () => {
  testIf(
    !(process.env.VUE_TEST_ENV === "DIST"),
    "creates an img with analytics using src",
    async () => {
      // Update src analytics value
      SDKAnalyticsConstants.sdkSemver = "1.0.0";
      SDKAnalyticsConstants.techVersion = "10.2.5";

      const component = mount(AdvancedImage, {
        props: { cldImg: cloudinaryImage },
      });
      await waitTicks(1);

      expect(component.html()).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=DALAABDSZAA0'
      );
    }
  );

  testIf(
    false,// process.env.VUE_TEST_ENV === "DIST",
    "creates an img with analytics using dist",
    async () => {
      const component = mount(AdvancedImage, {
        props: { cldImg: cloudinaryImage },
      });
      await waitTicks(1);

      expect(component.html()).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=DALFJtDLZAA0'
      );
    }
  );
});
