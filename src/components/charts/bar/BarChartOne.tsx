// "use client";
// import React from "react";

// import { ApexOptions } from "apexcharts";

// import dynamic from "next/dynamic";
// // Dynamically import the ReactApexChart component
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// export default function BarChartOne() {
//   const options: ApexOptions = {
//     colors: ["#465fff"],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "bar",
//       height: 180,
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "39%",
//         borderRadius: 5,
//         borderRadiusApplication: "end",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 4,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//       fontFamily: "Outfit",
//     },
//     yaxis: {
//       title: {
//         text: undefined,
//       },
//     },
//     grid: {
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },
//     fill: {
//       opacity: 1,
//     },

//     tooltip: {
//       x: {
//         show: false,
//       },
//       y: {
//         formatter: (val: number) => `${val}`,
//       },
//     },
//   };
//   const series = [
//     {
//       name: "Sales",
//       data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
//     },
//   ];
//   return (
//     <div className="max-w-full overflow-x-auto custom-scrollbar">
//       <div id="chartOne" className="min-w-[1000px]">
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="bar"
//           height={180}
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";

import dynamic from "next/dynamic";

import { ApexOptions } from "apexcharts";

// =====================================================
// DYNAMIC IMPORT
// =====================================================

const ReactApexChart = dynamic(
  () => import("react-apexcharts"),
  {
    ssr: false,
  }
);

// =====================================================
// TYPES
// =====================================================

interface ReusableBarChartProps {

  title?: string;

  height?: number;

  categories: string[];

  series: {
    name: string;
    data: number[];
  }[];

  colors?: string[];

  showLegend?: boolean;
}

// =====================================================
// COMPONENT
// =====================================================

export default function ReusableBarChart({

  title = "Analytics",

  height = 300,

  categories,

  series,

  colors = ["#2563eb"],

  showLegend = true,

}: ReusableBarChartProps) {

  // =====================================================
  // OPTIONS
  // =====================================================

  const options: ApexOptions = {

    colors,

    chart: {

      fontFamily:
        "Outfit, sans-serif",

      type: "bar",

      height,

      toolbar: {
        show: false,
      },
    },

    plotOptions: {

      bar: {

        horizontal: false,

        columnWidth: "38%",

        borderRadius: 6,

        borderRadiusApplication:
          "end",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {

      show: true,

      width: 3,

      colors: ["transparent"],
    },

    xaxis: {

      categories,

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {

        style: {

          fontSize: "12px",

          colors: "#6b7280",
        },
      },
    },

    yaxis: {

      labels: {

        style: {

          fontSize: "12px",

          colors: "#6b7280",
        },
      },
    },

    legend: {

      show: showLegend,

      position: "top",

      horizontalAlign: "left",

      fontFamily: "Outfit",

      labels: {
        colors: "#111827",
      },
    },

    grid: {

      borderColor: "#edf0f5",

      strokeDashArray: 4,

      yaxis: {

        lines: {
          show: true,
        },
      },
    },

    fill: {
      opacity: 1,
    },

    tooltip: {

      theme: "light",

      x: {
        show: false,
      },

      y: {

        formatter: (
          val: number
        ) => `₹ ${val}`,
      },
    },
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="bg-white border border-[#edf0f5] rounded-[24px] p-5 shadow-sm">

      {/* HEADER */}

      <div className="mb-5">

        <h2 className="text-[18px] font-bold text-[#111827]">
          {title}
        </h2>

      </div>

      {/* CHART */}

      <div className="max-w-full overflow-x-auto no-scrollbar">

        <div className="min-w-[700px]">

          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={height}
          />

        </div>

      </div>

    </div>
  );
}