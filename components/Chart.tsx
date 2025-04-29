import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

import React from 'react';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

type ChartProps = {
  currentPrice : number;
  prevClose : number;
  label : string;
}


const Chart = ({currentPrice, prevClose, label} : ChartProps ) => {
  
  const isUp = currentPrice >= prevClose;

  const chartData = {
    labels: ['Prev Close', 'Current Price'],
    datasets: [
      {
        label: label,
        data: [prevClose, currentPrice],
        borderColor: isUp ? '#4ade80' : '#f87171',
        backgroundColor: isUp ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full md:w-[60%] h-[300px] relative text-white">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { color: '#FFF' },
            },
            y: {
              ticks: { color: '#FFF' },
            },
          },
        }}
      />
    </div>

  )
}

export default Chart