import {
  DEFAULT_TOKENS,
  LOSING_MESSAGES,
  MATCH_REWARDS,
  NUM_REELS,
  SYMBOLS,
} from '@/constants/common';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Reel } from '../Reel/Reel';
import { ReelPosition } from '@/types/common';
import { randomIntFromInterval } from '@/helpers/common';

export const SlotMachine: FC = () => {
  const [symbols, setSymbols] = useState<string[]>([
    SYMBOLS[0],
    SYMBOLS[1],
    SYMBOLS[2],
  ]);

  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const sufficientTokens = tokens >= 10;

  const randomizeSymbols = useCallback(() => {
    const symbols = [];
    for (let i = 0; i < NUM_REELS; i++) {
      const symbol = SYMBOLS[randomIntFromInterval(0, SYMBOLS.length - 1)];
      symbols.push(symbol);
    }

    return symbols;
  }, []);

  useEffect(() => {
    setSymbols(randomizeSymbols());
  }, [randomizeSymbols]);

  const renderReels = useMemo(() => {
    const reels = [];

    for (let i = 0; i < NUM_REELS; i++) {
      let reelPosition: ReelPosition = 'center';
      if (i === 0) {
        reelPosition = 'left';
      }

      if (i === NUM_REELS - 1) {
        reelPosition = 'right';
      }

      reels.push(
        <Reel index={i} key={i} position={reelPosition} symbol={symbols[i]} />,
      );
    }
    return reels;
  }, [symbols]);

  const onPressSpin = () => {
    {
      let newTokenBalance = tokens - 10;
      const symbols = randomizeSymbols();
      setSymbols(symbols);
      const uniqueSymbols = Array.from(new Set(symbols));
      if (uniqueSymbols.length === 2) {
        newTokenBalance += MATCH_REWARDS[0];
      }
      if (uniqueSymbols.length === 1) {
        newTokenBalance += MATCH_REWARDS[1];
      }

      setTokens(Math.max(0, newTokenBalance));
    }
  };

  const onPressPlayAgain = () => {
    setSymbols(randomizeSymbols());
    setTokens(DEFAULT_TOKENS);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-xl font-bold p-10">Tokens: {tokens}</div>
      {!sufficientTokens && (
        <button
          onClick={onPressPlayAgain}
          className={`${'text-2xl text-green-500 dark:md:hover:bg-fuchsia-600  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md'} `}
        >
          {'Play again?'}
        </button>
      )}
      <div className="font-mono flex-row flex justify-center items-center border-4 rounded-lg m-10">
        {renderReels}
      </div>
      <button
        onClick={onPressSpin}
        disabled={!sufficientTokens}
        className={`${
          sufficientTokens
            ? 'text-2xl text-green-500  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md'
            : 'text-red-600 text-2xl'
        } `}
      >
        {sufficientTokens
          ? 'Spin'
          : LOSING_MESSAGES[
              randomIntFromInterval(0, LOSING_MESSAGES.length - 1)
            ]}
      </button>
    </div>
  );
};
