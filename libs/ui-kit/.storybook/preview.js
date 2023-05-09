import { create } from '@storybook/theming';
import './global.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    theme: create({
      brandTitle: 'Shared',
      base: 'light',
    }),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },
};
