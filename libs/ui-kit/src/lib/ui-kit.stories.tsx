import { Story, Meta } from '@storybook/react';
import { UiKit, UiKitProps } from './ui-kit';

export default {
  component: UiKit,
  title: 'UiKit',
} as Meta;

const Template: Story<UiKitProps> = (args) => <UiKit {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
