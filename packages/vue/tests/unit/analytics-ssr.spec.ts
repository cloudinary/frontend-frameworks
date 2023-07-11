/**
 * @jest-environment node
 */
import { AdvancedImage } from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { SDKAnalyticsConstants } from "../../src/internal/SDKAnalyticsConstants";
import { testIf } from "./utils";

const cloudinaryImage = new CloudinaryImage("sample", { cloudName: "demo" });

describe("analytics", () => {
  testIf(
    !(process.env.VUE_TEST_ENV === "DIST"),
    "creates an img with analytics using src",
    async () => {
      // Update src analytics value
      SDKAnalyticsConstants.sdkSemver = "1.0.0";
      SDKAnalyticsConstants.techVersion = "10.2.5";

      const app = createSSRApp({
        template: '<AdvancedImage :cldImg="cldImg" />',
        data: () => ({
          cldImg: cloudinaryImage,
        }),
        components: { AdvancedImage },
      });
      const html = await renderToString(app);
      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=BALAABDS0'
      );
    }
  );

  testIf(
    process.env.VUE_TEST_ENV === "DIST",
    "creates an img with analytics using dist",
    async () => {
      const app = createSSRApp({
        template: '<AdvancedImage :cldImg="cldImg" />',
        data: () => ({
          cldImg: cloudinaryImage,
        }),
        components: { AdvancedImage },
      });
      const html = await renderToString(app);
      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=BALFJtDL0'
      );
    }
  );
});
