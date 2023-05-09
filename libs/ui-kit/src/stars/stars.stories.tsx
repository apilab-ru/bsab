import { Story, Meta } from '@storybook/react';
import { Stars, StarsProps } from './stars';

export default {
  component: Stars,
  title: 'Stars',
} as Meta;

const Template: Story<StarsProps> = (args) => <Stars {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  stars: 5
};
