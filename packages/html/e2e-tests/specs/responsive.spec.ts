import { expect } from 'chai';
import { describeCommon } from '../TestHelper';
import {BrowserUtils} from "wdio-allure-ts";

const {click, getAttribute, isDisplayed, waitForDisplayed, waitUntil, setWindowSize} = BrowserUtils;

describeCommon('Responsive Image', () => {
  beforeEach(() => {
    setWindowSize(1000, 1000);
    // runs before each test in the block
    click('#responsiveBtn');
    waitForDisplayed('#responsive');
  });

  it('Should display an image', () => {
    expect(isDisplayed('#responsive')).to.equal(true);
  });

  it('Should have an image with width of 330 at first', () => {
    //Container div width is 330
    const imgSrc = getAttribute('#responsive', 'src');
    expect(imgSrc).to.equal('https://res.cloudinary.com/demo/image/upload/c_scale,w_330/sample');
  });

  it('Should have an image with width of 400 after window resize', () => {
    //Container div width is 330, responsive is set with 100px step on resize event, so should be 400
    setWindowSize(1200,1000);
    const imgSrc = getAttribute('#responsive', 'src');
    expect(imgSrc).to.equal('https://res.cloudinary.com/demo/image/upload/c_scale,w_400/sample');
  });
});
