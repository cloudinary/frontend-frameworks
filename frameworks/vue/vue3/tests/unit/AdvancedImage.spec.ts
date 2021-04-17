import { shallowMount } from '@vue/test-utils';
import { AdvancedImage } from '@/index';

describe('AdvancedImage', () => {
  it('renders and image', () => {
    const wrapper = shallowMount(AdvancedImage, {
      props: { }
    })
    expect(wrapper.html()).toEqual(`<img src="https://res.cloudinary.com/demo/image/upload/sample" alt="">`);
  });
});
