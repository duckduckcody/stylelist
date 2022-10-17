import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { SearchBox, SearchBoxProps } from './search-box';

export default {
  title: 'atoms/Search Box',
  component: SearchBox,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
