import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    text: 'Scroll down to see a lazy-loaded responsive accessible image with a placeholder'
  }
});

export default app;