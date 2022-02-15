import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 10,
    label: '10克/g',
  },
  {
    value: 30,
    label: '30克/g',
  },
  {
    value: 50,
    label: '50克/g',
  },
  {
    value: 100,
    label: '100克/g',
  },
];

function valuetext(value) {
  return `${value}克/g`;
}

export default function DiscreteSliderMarks() {

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}