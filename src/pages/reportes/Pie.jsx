import React, { useState, useEffect } from 'react';

import { Pie } from '@ant-design/plots';

const DemoPie = () => {
    const data = [
        {
            type: 'dsf',
            value: 27,
        },
        {
            type: 'ty',
            value: 25,
        },
        {
            type: 'sin',
            value: 18,
        },
        {
            type: 'otro',
            value: 15,
        },
        {
            type: 'es',
            value: 10,
        },
        {
            type: 'dfds',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return <Pie {...config} />;
};

export default DemoPie;