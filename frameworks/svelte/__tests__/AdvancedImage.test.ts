import {AdvancedImage} from '../src/index';
import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
import {getImageAttr, getImageElement, mount} from "./testUtils/testUtils";

const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});

describe('AdvancedImage', () => {
  it('is truthy', () => {
    expect(AdvancedImage).toBeTruthy();
  });

  it('creates an image element', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage});
    const img = getImageElement(container)
    expect(img).toBeTruthy();
  });

  it('src attribute should include cloud_name & public_id', async () => {
    const {container} = await mount(AdvancedImage, {cldImg: cloudinaryImage});
    const src = getImageAttr(container, 'src')
    expect(src).toBe(
      'https://res.cloudinary.com/demo/image/upload/sample'
    );
  });

  it('should add style to img component', async () => {
    const {container} = await mount(AdvancedImage, {style: "opacity: 0.5", cldImg: cloudinaryImage});
    const style = getImageAttr(container, 'style').cssText;
    expect(style).toEqual("opacity: 0.5;");
  });

  it('should resolve with a cancel on unmount', async (done) => {
    const plugin = (_element: HTMLImageElement, _cldImage: CloudinaryImage, htmlPluginState: any) => {
      return new Promise((resolve) => {
        htmlPluginState.cleanupCallbacks.push(() => {
          resolve('canceled');
        });
      }).then((res) => {
        expect(res).toBe('canceled');
        done();
      }).catch(e => {
        console.log(e);
      });
    };

    const {component} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [plugin]});
    component.$destroy();
  });

  it('afterUpdate() should trigger a plugin rerun', async () => {
    const mock = jest.fn();
    const {component} = await mount(AdvancedImage, {cldImg: cloudinaryImage, plugins: [mock]});

    // Plugins called once
    expect(mock).toHaveBeenCalledTimes(1);

    // Update props to trigger component.afterUpdate
    await component.$set({a:'b'});

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
