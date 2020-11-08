import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BuildSetCalculator } from '../BuildSetCalculator';
import { BuildSetCalculatorConfig } from '../BuildSetCalculatorCommon';

export default {
    title: 'Example/BuildSetCalculator',
    component: BuildSetCalculator,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<BuildSetCalculatorConfig> = (args) => <BuildSetCalculator {...args} />;

export const MostFeared90 = Template.bind({});
MostFeared90.args = {
    requirements: [
        {
            label: '87 OVR Most Feared'
        },
        {
            label: '87 OVR Most Feared'
        },
        {
            label: '85 OVR Most Feared'
        },
        {
            label: '85 OVR Most Feared'
        }
    ],
    builds: [
        {
            label: '90 OVR Most Feared'
        }
    ]
};
