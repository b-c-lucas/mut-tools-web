import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SetCalculatorPage } from '../SetCalculator/SetCalculatorPage';

export default {
    title: 'Example/SetCalculatorPage',
    component: SetCalculatorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story = (args) => <SetCalculatorPage />;

export const MostFeared = Template.bind({});
