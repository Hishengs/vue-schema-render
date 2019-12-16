import { configure, addParameters } from '@storybook/vue';
import { create } from '@storybook/theming/create';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(js|mdx)$/), module);

const customTheme = create({
  base: 'light',
  brandTitle: 'Vue Schema Render',
});

addParameters({
  options: {
    theme: customTheme,
    panelPosition: 'right'
  }
});
