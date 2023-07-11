/**
 * @jest-environment node
 */
import {
  AdvancedImage,
  accessibility,
  lazyload,
  placeholder,
  responsive,
} from "../../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { testIf } from "./utils";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

const renderApp = (data?: { plugins: Array<unknown> }) => {
  const app = createSSRApp({
    template: '<AdvancedImage :cldImg="cldImg" :plugins="plugins" />',
    data: () => ({
      cldImg: cloudinaryImage,
      ...data,
    }),
    components: { AdvancedImage },
  });
  return renderToString(app);
};

describe("ssr", () => {
  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "creates an img with analytics using src",
    async () => {
      const html = await renderApp();

      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample'
      );
    }
  );

  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "should render accessibility transformation with accessibility",
    async () => {
      const html = await renderApp({
        plugins: [accessibility()],
      });

      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample'
      );
    }
  );

  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "should render the placeholder image in SSR",
    async () => {
      const html = await renderApp({
        plugins: [placeholder()],
      });

      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/e_vectorize/q_auto/f_svg/sample'
      );
    }
  );

  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "should render original image when responsive",
    async () => {
      const html = await renderApp({
        plugins: [responsive()],
      });

      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample'
      );
    }
  );

  testIf(
    !(process.env.VUE3_TEST_ENV === "DIST"),
    "should render original image when lazy loaded",
    async () => {
      const html = await renderApp({
        plugins: [lazyload()],
      });

      expect(html).toMatch(
        '<img src="https://res.cloudinary.com/demo/image/upload/sample'
      );
    }
  );
});
