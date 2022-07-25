import { AdvancedImage } from "../../src/index";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { SDKAnalyticsConstants } from "../../src/internal/SDKAnalyticsConstants";
import { mount } from "@vue/test-utils";
import { waitTicks } from "./utils";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version, devDependencies } from "../../package.json";
const vueVersion = devDependencies.vue;

const cloudinaryImage = new CloudinaryImage("sample", { cloudName: "demo" });

describe("analytics", () => {
  beforeEach(() => {
    SDKAnalyticsConstants.sdkSemver = "1.0.0";
    SDKAnalyticsConstants.techVersion = "10.2.5";
  });

  afterEach(() => {
    SDKAnalyticsConstants.sdkSemver = version;
    SDKAnalyticsConstants.techVersion = vueVersion;
  });

  it("creates an img with analytics", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage },
    });

    await waitTicks(1);
    expect(component.html()).toEqual(
      '<img src="https://res.cloudinary.com/demo/image/upload/sample?_a=ALAABDS0">'
    );
  });
});
