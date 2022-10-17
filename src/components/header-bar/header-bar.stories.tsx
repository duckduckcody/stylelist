import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { HeaderBar, HeaderBarProps } from './header-bar';

export default {
  title: 'atoms/Header Bar',
  component: HeaderBar,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
} as Meta;

const Template: Story<HeaderBarProps> = (args) => <HeaderBar {...args} />;
export const Primary = Template.bind({});
Primary.args = {};