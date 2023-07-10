import { AdvancedImage, lazyload, responsive } from "../../dist";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { mount } from "@vue/test-utils";
import { waitTicks } from "./utils";
import FakeTimers from "@sinonjs/fake-timers";
import { dispatchResize } from "../../../../testUtils/dispatchResize";
import { crop } from "@cloudinary/url-gen/actions/resize";

const cloudinaryImage = new CloudinaryImage(
  "sample",
  { cloudName: "demo" },
  { analytics: false }
);

const waitForResize = async (
  clock: FakeTimers.InstalledClock,
  size: number
) => {
  // Wait for plugins to finish
  await waitTicks(1);

  dispatchResize(
    (document.getElementById("wrapper") as HTMLDivElement)
      .firstChild as HTMLDivElement,
    size
  );

  // Wait for resize event
  await clock.tickAsync(100);
};

describe("responsive", () => {
  // We are using clock to wait for events
  let clock: FakeTimers.InstalledClock;
  beforeEach(() => {
    clock = FakeTimers.install();

    const rootDiv = document.createElement("div");
    rootDiv.id = "wrapper";
    document.body.appendChild(rootDiv);
  });
  afterEach(() => {
    clock.uninstall();

    const wrapper = document.getElementById("wrapper");
    if (wrapper) {
      wrapper.remove();
    }
  });

  it("should apply initial container width (default 250)", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [responsive()] },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    expect(component.html()).toContain(
      "https://res.cloudinary.com/demo/image/upload/c_scale,w_250/sample"
    );
  });

  it("Should respect single step and ignore default width of 250 (When Step < Width)", async () => {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [responsive({ steps: 100 })] },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    // Output is exactly 300 due to internal rounding: ROUND_UP(CONTAINER / STEP) * STEP
    // When STEP < CONTAINER, output is always a multiplication of STEP
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"'
    );
  });

  it("Should respect single step and ignore default width of 250 (When Step > Width)", async function () {
    const component = mount(AdvancedImage, {
      props: { cldImg: cloudinaryImage, plugins: [responsive({ steps: 251 })] },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    // Output is exactly 251 due to internal rounding: ROUND_UP(CONTAINER / STEP) * STEP
    // When STEP > CONTAINER, output is always STEP.
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_251/sample"'
    );
  });

  it("Should respect steps and ignore default width of 250", async function () {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive({ steps: [10, 20, 30] })],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    // Output is closest number to parentElement, never exceeding the width of the max step )
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_30/sample"'
    );
  });

  it("should update container width on window resize", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive()],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 100);

    // Output is closest number to parentElement, never exceeding the width of the max step )
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample"'
    );
  });

  it("should step by the 100th", async () => {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive({ steps: 100 })],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    // Output is closest number to parentElement, never exceeding the width of the max step )
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"'
    );
  });

  it("should step by breakpoints", async function () {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive({ steps: [800, 1000, 1200, 3000] })],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    // Output is closest number to parentElement, never exceeding the width of the max step )
    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample"'
    );

    await waitForResize(clock, 975);

    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_1000/sample"'
    );
  });

  it("should not resize to larger than provided breakpoints", async function () {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive({ steps: [800, 1000, 1200, 3000] })],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 4000);

    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"'
    );
  });

  it("should handle unordered breakpoints", async function () {
    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive({ steps: [1000, 800, 3000, 1200] })],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 5000);

    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_scale,w_3000/sample"'
    );
  });

  it("should append to existing transformation", async function () {
    cloudinaryImage.resize(crop("500"));

    const component = mount(AdvancedImage, {
      props: {
        cldImg: cloudinaryImage,
        plugins: [responsive()],
      },
      attachTo: "#wrapper",
    });

    await waitForResize(clock, 250);

    expect(component.html()).toContain(
      'src="https://res.cloudinary.com/demo/image/upload/c_crop,w_500/c_scale,w_250/sample"'
    );
  });
});
