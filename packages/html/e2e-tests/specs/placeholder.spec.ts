import { expect } from 'chai';
import { describeCommon } from '../TestHelper';
import {BrowserUtils} from "wdio-allure-ts";

const {click, getAttribute, isDisplayed, waitForDisplayed, waitUntil} = BrowserUtils;
const getImgSrc = ()=>getAttribute('#placeholder', 'src');

describeCommon('Placeholder Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    click('#placeholderBtn');
    waitForDisplayed('#placeholder');
  });

  it('Should display an image', () => {
    expect(isDisplayed('#placeholder')).to.equal(true);
  });

  it('Should displaye the original image eventually', () => {
    const testImgSrc = ()=>getImgSrc()==='https://res.cloudinary.com/demo/image/upload/sample';
    waitUntil(testImgSrc, getImgSrc(), 2000);
  });
});
