import { Audio } from 'react-loader-spinner';
import React from 'react';

export function Loader() {
  return (
    <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
/>
  )
}
