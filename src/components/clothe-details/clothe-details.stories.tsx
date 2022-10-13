import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { mockClothe } from '../../mocks/mockClothe';
import { ClotheDetails, ClotheDetailsProps } from './clothe-details';

export default {
  title: 'atoms/Clothe Details',
  component: ClotheDetails,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
} as Meta;

const Template: Story<ClotheDetailsProps> = (args) => (
  <ClotheDetails {...args} />
);
export const Primary = Template.bind({});
Primary.args = {
  clothe: mockClothe(),
};
