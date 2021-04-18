import { shallowMount } from '@vue/test-utils';
import { AdvancedVideo } from '@/index';

describe('AdvancedVideo', () => {
  it('renders a video', () => {
    const wrapper = shallowMount(AdvancedVideo, {
      props: { }
    })
    expect(wrapper.html()).toEqual(`<video src="https://res.cloudinary.com/demo/video/upload/sample"></video>`);
  });
});
