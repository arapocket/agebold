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
  const [winnings, setWinnings] = useState<number | null>(null);
  const [lost, setLost] = useState<boolean>(false);
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
        <Reel
          index={i}
          key={i}
          position={reelPosition}
          symbol={symbols[i]}
          winnings={!!winnings}
          lost={lost}
        />,
      );
    }
    return reels;
  }, [symbols, lost, winnings]);

  const renderWinnings = () => {
    if (!sufficientTokens) {
      return (
        <button
          onClick={onPressPlayAgain}
          className={`${'transition delay-150 hover:-translate-y-1 hover:animate-none hover:scale-110 text-2xl min-h-14 animate-pulse text-green-500 dark:md:hover:bg-fuchsia-600  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md'} `}
        >
          {`${!sufficientTokens ? 'Play again?' : ''}`}
        </button>
      );
    }

    return (
      <div className="text-2xl text-green-500 min-h-14 animate-ping">
        {winnings && `WIN ${winnings}`}
      </div>
    );
  };

  const onPressSpin = () => {
    {
      let newTokenBalance = tokens - 10;
      const symbols = randomizeSymbols();
      setSymbols(symbols);
      const uniqueSymbols = Array.from(new Set(symbols));
      if (uniqueSymbols.length === 2) {
        const winnings = MATCH_REWARDS[0];
        newTokenBalance += winnings;
        setWinnings(winnings);
        setLost(false);
      } else if (uniqueSymbols.length === 1) {
        const winnings = MATCH_REWARDS[1];
        newTokenBalance += winnings;
        setLost(false);
        setWinnings(winnings);
      } else {
        setLost(true);
        setWinnings(null);
      }

      setTokens(Math.max(0, newTokenBalance));
    }
  };

  const onPressPlayAgain = () => {
    setSymbols(randomizeSymbols());
    setTokens(DEFAULT_TOKENS);
    setLost(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-xl font-bold p-5">Tokens: {tokens}</div>
      {renderWinnings()}
      <div
        className={`font-mono flex-row flex justify-center items-center border-4 rounded-lg m-10 ${
          winnings ? ' border-green-500' : lost ? 'border-red-600' : ''
        }`}
      >
        {renderReels}
      </div>
      <button
        onClick={onPressSpin}
        disabled={!sufficientTokens}
        className={`animate-pulse transition delay-150 hover:-translate-y-1 hover:animate-none hover:scale-110 ${
          sufficientTokens
            ? 'text-2xl text-blue-500  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md'
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
