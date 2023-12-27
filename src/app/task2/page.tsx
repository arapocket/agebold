import React from 'react';
import { InfoCircle } from '@/assets/InfoCircle';
import { DESCRIPTION_TEXT } from '@/constants/task2';

const RentBreakdownCard = () => {
  return (
    <div className="bg-gray-50 screen-corner-triangle h-screen">
      <div className="p-4 pt-20 rounded-lg w-6/12 mx-auto h-2/5">
        <h2 className="text-xl font-semibold text-gray-800">Rent breakdown</h2>
        <p className="text-base text-gray-600 my-2 max-w-96 whitespace-pre-line font-light">
          {DESCRIPTION_TEXT}
        </p>
        <div className="bg-white p-4 border rounded-2xl my-8 relative">
          <div className="card">$</div>
          <div className="flex justify-between items-center pl-5">
            <div className="flex flex-row align-middle justify-center">
              <span className="text-sm text-center text-gray-600 pr-1.5">
                Asked Rent
              </span>
              <span>
                <InfoCircle />
              </span>
            </div>
            <span className="text-base text-gray-600 pr-5">
              <span className="text-gray-400">$ </span>39,000
            </span>
          </div>

          <div className="bg-white p-4 my-3 border-2 rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">
            <div className="flex justify-between items-center my-2">
              <div className="flex flex-row align-middle justify-center">
                <span className="text-sm text-gray-600 pr-1.5">
                  Your Proposed Rent
                </span>
                <span>
                  <InfoCircle />
                </span>
              </div>
              <span className="text-base text-gray-600">
                <span className="text-green-600">$ </span> --
              </span>
            </div>

            <div className="flex justify-between items-center my-2">
              <div className="flex flex-row align-middle justify-center">
                <span className="text-sm text-gray-600 pr-1.5">
                  Utility Bill
                </span>
                <span>
                  <InfoCircle />
                </span>
              </div>
              <span className="text-base text-gray-600">
                <span className="text-gray-400">$ </span>9,000
              </span>
            </div>

            <div className="flex justify-between items-center my-2">
              <span className="text-sm text-gray-600">Taxes</span>
              <span className="text-base text-gray-600">
                <span className="text-gray-400">$ </span>3,000
              </span>
            </div>

            <div className="flex justify-between items-center my-2 border-dotted border-t-2 border-gray-300 pt-5">
              <span className="text-sm text-gray-600">
                Expected monthly expense
              </span>
              <span className="text-lg text-gray-800 font-bold">
                <span className="text-gray-500">$ </span>--
              </span>
            </div>
          </div>
        </div>
        <button className="rounded-lg border shadow-md py-2 px-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 hover:bg-indigo-500">
          <span className="text-gray-700 text-base">Need help?</span>
        </button>
      </div>
    </div>
  );
};

export default RentBreakdownCard;
