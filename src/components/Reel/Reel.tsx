import { SYMBOLS } from '@/constants/common';
import { randomIntFromInterval } from '@/helpers/common';
import { ReelPosition } from '@/types/common';
import { FC, useEffect, useState } from 'react';

export const Reel: FC<{
  index: number;
  position: ReelPosition;
  symbol: string;
}> = ({ index, position, symbol }) => {
  const reelPosition = {
    center: 'border-r-4 border-l-4',
    left: '',
    right: '',
  };

  return symbol ? (
    <div key={index} className={`p-10 text-4xl ${reelPosition[position]}`}>
      {symbol}
    </div>
  ) : null;
};
