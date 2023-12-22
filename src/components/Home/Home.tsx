'use client';
import { FC } from 'react';
import { SlotMachine } from '@/components/SlotMachine/SlotMachine';
import NoSSR from '@/components/NoSSR/NoSSR';

export const HomeContent: FC = () => {
  return (
    <NoSSR>
      <div className="w-full items-center justify-between font-mono">
        <div className="text-center text-4xl p-20">Slots</div>

        <SlotMachine />
      </div>
    </NoSSR>
  );
};
