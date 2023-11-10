"use client";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {};
const data = {
  datasets: [
    {
      label: "Martin",
      data: [
        {
          x: 1,
          y: 1450,
          r: 10,
        },
      ],
      backgroundColor: "#8A4FFF",
    },
    {
      label: "Arionkoder",
      data: [
        {
          x: 1,
          y: 1350,
          r: 10,
        },
      ],
      backgroundColor: "#6DF1C9",
    },
    {
      label: "Pariveda",
      data: [
        {
          x: 2,
          y: 1400,
          r: 10,
        },
      ],
      backgroundColor: "#FF1654",
    },
    {
      label: "Toyota",
      data: [
        {
          x: 3,
          y: 1550,
          r: 10,
        },
      ],
      backgroundColor: "#FF8540",
    },
  ],
};
const Graph = () => {
  const [totaldata, setDataStructure] = React.useState(null);

  const newData = [
    {
      client: "Turnco",
      depth: 2,
      revenue: 487449,
    },
    {
      client: "Roostrap",
      depth: 0,
      revenue: 212540,
    },
    {
      client: "Pariveda",
      depth: 0,
      revenue: 1571682,
    },
    {
      client: "Reptrak",
      depth: 0,
      revenue: 407768,
    },
    {
      client: "Arionkoder",
      depth: 0,
      revenue: 289569,
    },
    {
      client: "Andela",
      depth: 0,
      revenue: 227980,
    },
    {
      client: "iSeatz",
      depth: 0,
      revenue: 435353,
    },
    {
      client: "Aspen Grove",
      depth: 0,
      revenue: 711560,
    },
    {
      client: "Alliance",
      depth: 0,
      revenue: 582468,
    },
    {
      client: "Juango",
      depth: 0,
      revenue: 290815,
    },
  ];

  React.useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    try {
      const response = await fetch(
        "https://carmelo-dev.arionkoder.io/config/client_depth"
      ).then((res) => res.json());

      getData(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getData = async (data) => {
    let structureData = [];

    data.map((item) => {
      structureData.push({
        label: item.client,
        data: [
          {
            x: item.depth,
            y: item.revenue,
            r: 10,
          },
        ],
        backgroundColor: generarColorAleatorio(),
      });
    });

    const dataComplete = {
      datasets: structureData,
    };

    setDataStructure(dataComplete);
  };

  function generarColorAleatorio() {
    // Generar un número aleatorio entre 0 y 0xFFFFFF
    let colorAleatorio = Math.floor(Math.random() * 0xffffff);

    // Convertir el número a hexadecimal y agregar el símbolo de hash
    return "#" + colorAleatorio.toString(16).padStart(6, "0");
  }

  return (
    <div>
      Carmelo Graph
      {totaldata !== null && <Bubble options={options} data={totaldata} />}
    </div>
  );
};

export default Graph;
