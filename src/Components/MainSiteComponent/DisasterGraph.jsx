import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,      // Add PointElement
  LineElement,       // Add LineElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,      // Register PointElement
  LineElement,       // Register LineElement
  Title,
  Tooltip,
  Legend
);

const DisasterGraph = () => {
  // Manually input the data for the past year and the last 20 years
  const [pastYearData] = useState([
    { month: "January", frequency: 12 },
    { month: "February", frequency: 8 },
    { month: "March", frequency: 15 },
    { month: "April", frequency: 10 },
    { month: "May", frequency: 20 },
    { month: "June", frequency: 18 },
    { month: "July", frequency: 22 },
    { month: "August", frequency: 17 },
    { month: "September", frequency: 16 },
    { month: "October", frequency: 24 },
    { month: "November", frequency: 21 },
    { month: "December", frequency: 25 },
  ]);

  const [twentyYearData] = useState([
    { year: 2004, count: 120 },
    { year: 2005, count: 140 },
    { year: 2006, count: 110 },
    { year: 2007, count: 180 },
    { year: 2008, count: 150 },
    { year: 2009, count: 130 },
    { year: 2010, count: 200 },
    { year: 2011, count: 160 },
    { year: 2012, count: 170 },
    { year: 2013, count: 190 },
    { year: 2014, count: 210 },
    { year: 2015, count: 230 },
    { year: 2016, count: 220 },
    { year: 2017, count: 250 },
    { year: 2018, count: 270 },
    { year: 2019, count: 300 },
    { year: 2020, count: 320 },
    { year: 2021, count: 350 },
    { year: 2022, count: 370 },
    { year: 2023, count: 400 },
  ]);

  const pastYearChartData = {
    labels: pastYearData.map((item) => item.month),
    datasets: [
      {
        label: "Disasters Frequency (Past Year)",
        data: pastYearData.map((item) => item.frequency),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const twentyYearChartData = {
    labels: twentyYearData.map((item) => item.year),
    datasets: [
      {
        label: "Disasters Over 20 Years",
        data: twentyYearData.map((item) => item.count),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Cleanup function to destroy the chart instances
    return () => {
      if (window.Chart) {
        window.Chart.instances.forEach(chart => chart.destroy());
      }
    };
  }, []);

  return (
    <div className="max-w-screen-xl container mx-auto p-4 space-y-8">
      <div className="flex flex-col min-w-max justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Disaster Data Analysis</h2>
        <p className="text-gray-700 mb-8">
          Below are the charts representing disaster occurrences over the past
          year and the last 20 years.
        </p>
      </div>

      <div className="flex flex-col lg:justify-around lg:flex-row bg-white shadow-gray-300 dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-5">
        <div className="lg:w-1/2 text-center">
          <h2 className="text-lg font-bold mb-2">
            Disasters Frequency (Past Year)
          </h2>
          <Bar data={pastYearChartData} options={{ responsive: true }} />
        </div>
        <div className="lg:w-1/3 lg:pl-6 pt-4 lg:pt-0 text-center">
          <div className="mt-28">
            <h3 className="text-md font-semibold mb-2">
              Analysis of Last Year
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              This chart shows the frequency of disasters over the past year,
              categorized by month. You can observe a spike in disaster
              occurrences during certain months.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:justify-around lg:flex-row bg-white shadow-gray-300 dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-5">
        <div className="lg:w-1/2 text-center">
          <h2 className="text-lg font-bold mb-2">
            Disasters Over the Past 20 Years
          </h2>
          <Line data={twentyYearChartData} options={{ responsive: true }} />
        </div>
        <div className="lg:w-1/3 lg:pr-6 pt-4 lg:pt-0 text-center">
          <div className="mt-28">
            <h3 className="text-md font-semibold mb-2">Long-Term Trends</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              This chart provides a long-term view of disaster occurrences over
              the past two decades, highlighting trends and periods of increased
              disaster frequency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterGraph;
