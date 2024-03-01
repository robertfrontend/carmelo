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

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      beginAtZero: true,
    },
  },
};

const Graph = () => {
  const [totaldata, setDataStructure] = React.useState([]);
  const [copyData, setCopyData] = React.useState([]);

  const [dataGraph, setDataGraph] = React.useState([]);

  React.useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    // "https://carmelo.arionkoder.io/config/client_depth";

    try {
      const response = await fetch(
        "https://carmelo.arionkoder.io/config/client_depth"
      ).then((res) => res.json());

      console.log(response, "response data");
      getData(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getData = async (data) => {
    let dataStructure = [];

    data.map((item) => {
      dataStructure.push({
        label: item.client,
        data: [
          {
            x: item.depth,
            y: item.revenue,
            r: 10,
            add: true,
          },
        ],
        backgroundColor: colorGenerator(),
      });
    });

    setCopyData(dataStructure);
    setDataStructure(dataStructure);
  };

  function colorGenerator() {
    let randomColor = Math.floor(Math.random() * 0xffffff);

    return "#" + randomColor.toString(16).padStart(6, "0");
  }

  const handleSelect = (value, companies) => {
    if (value === "all") {
      setDataGraph([]);
      setDataStructure([]);

      const newCopyData = [];
      copyData.map((item) => {
        newCopyData.push({
          ...item,
          add: true,
        });
      });

      setDataGraph(newCopyData);
      setDataStructure(newCopyData);
    } else {
      const filterCompany = companies.find(
        (company) => company.label === value
      );
      filterCompany.add = true;

      setDataGraph([...dataGraph, filterCompany]);
    }
  };

  const handleResetFilter = () => {
    const newCopyData = [];
    copyData.map((item) => {
      newCopyData.push({
        ...item,
        add: false,
      });
    });

    setDataStructure(newCopyData);
    setDataGraph([]);
  };

  return (
    <section className="sectionGraph">
      <header>
        <h1 className="text-4xl font-bold text-gray-900">Carmelo Graph</h1>
        <FormAddCompany
          totaldata={totaldata}
          handleSelect={handleSelect}
          dataGraph={dataGraph}
          handleResetFilter={handleResetFilter}
        />

        {dataGraph.length === 0 && (
          <>
            <h1 className="text-2xl">To view the graph select a company ✨</h1>
          </>
        )}
      </header>

      {totaldata !== null && (
        <Bubble options={options} data={{ datasets: dataGraph }} />
      )}
    </section>
  );
};

const FormAddCompany = ({ totaldata, handleSelect, handleResetFilter }) => {
  const [statusSelect, setStatusSelect] = React.useState(false);

  const handleSelectHTML = (value) => {
    setStatusSelect(true);
    handleSelect(value, totaldata);
  };

  return (
    <>
      <div className="custom-select flex justify-center items-center pt-5 mx-auto">
        <div>
          {totaldata !== null && (
            <form className="max-w-sm mx-4">
              <select
                id="countries"
                className="bg-gray-50 border text-lg border-gray-300 px-10 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                onChange={(e) => handleSelectHTML(e.target.value, totaldata)}
              >
                <option selected>Choose a company</option>
                <option value="all">Add all</option>
                {totaldata.map((item, index) => (
                  <option key={index} value={item.label} disabled={item.add}>
                    {item.label} {item.add ? "✔️" : ""}
                  </option>
                ))}
              </select>
            </form>
          )}
        </div>
      </div>
      <div className="mt-4">
        {statusSelect && (
          <button
            type="button"
            onClick={() => handleResetFilter()}
            className="text-white mt-2 cursor-pointer bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            🧼 Reset filter
          </button>
        )}
      </div>
    </>
  );
};

export default Graph;
