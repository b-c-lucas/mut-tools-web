import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BuildSetCalculatorPage } from '../BuildSetCalculatorPage';

export default {
    title: 'Example/BuildSetCalculatorPage',
    component: BuildSetCalculatorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story = (args) => <BuildSetCalculatorPage />;

export const MostFeared = Template.bind({});
