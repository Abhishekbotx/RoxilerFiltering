import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ chartData }) {
    const dataArray = new Array(10).fill(0);

    chartData.forEach(item => {
        const index = Math.floor(item._id / 100);
        dataArray[index] = item.count;
    });

    const data = {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901+'],
        datasets: [
            {
                label: 'Number of Items',
                data:dataArray,
                fill: false,
                borderColor: 'rgba(17, 182, 228, 1)',
                tension: 0.4,
                borderWidth: 3,
                borderRadius: 50,
                barThickness: 15,
                borderWidth: 2
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true,
                },
                ticks: {
                    stepSize: 1,
                },
                min: 0,
                max: 6
            }
        }
    };

    return (
        <div className='rounded-md bg-white shadow-md p-4'>
            <h2 className="text-2xl font-semibold mb-8 mt-2">
                Items Sold
            </h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;
