import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CloseXIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.75 5.25L5.25 18.75"
      stroke="black"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.75 18.75L5.25 5.25"
      stroke="black"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
