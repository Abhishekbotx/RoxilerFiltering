import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS,ArcElement,  Tooltip,Legend,} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ pieChartData }) {
  if (!pieChartData || pieChartData.length === 0) {
    return <p>Loading chart data...</p>; 
  }

  const data = {
    labels: pieChartData.map(item => item._id), 
    datasets: [
      {
        data: pieChartData.map(item => item.count), 
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
        ],
      },
    ],
  };
  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach(data => {
            sum += data;
          });
        },
        color: 'black',
        font: {
          weight: 'bold',
          size: 10
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 5,
          margin:0,
          boxWidth: 20,
          boxHeight: 8,
          font: {
            size: 14
          },
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              let sum = 0;
              data.datasets[0].data.forEach(data => {
                sum += data;
              });
              return {
                text: `${label}: ${value}`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              };
            });
          }
        }
      }
    }
  };
  
    return (
      <div className="p-4 h-full w-full flex flex-col bg-white rounded-md shadow-md  items-center">
        <h2 className="text-lg font-semibold mb-4">Category Statistics</h2>
        <Pie data={data} options={options}  />
      </div>
    );
  };
export default PieChart;
