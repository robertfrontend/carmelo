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

const Graph = () => {
  const [totaldata, setDataStructure] = React.useState(null);

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
            add: false,
          },
        ],
        backgroundColor: colorGenerator(),
      });
    });

    setDataStructure(dataStructure);
  };

  function colorGenerator() {
    let randomColor = Math.floor(Math.random() * 0xffffff);

    return "#" + randomColor.toString(16).padStart(6, "0");
  }

  const handleSelect = (value, companies) => {
    const filterCompany = companies.find((company) => company.label === value);
    filterCompany.add = true;

    setDataStructure([...totaldata, filterCompany]);

    setDataGraph([...dataGraph, filterCompany]);
  };

  return (
    <section className="sectionGraph">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Carmelo Graph</h1>
        <FormAddCompany
          totaldata={totaldata}
          handleSelect={handleSelect}
          dataGraph={dataGraph}
        />
      </header>

      {totaldata !== null && (
        <Bubble options={options} data={{ datasets: dataGraph }} />
      )}
    </section>
  );
};

const FormAddCompany = ({ totaldata, handleSelect }) => {
  return (
    <>
      <div className="custom-select flex justify-center items-center pt-5 mx-auto">
        <div>
          {totaldata !== null && (
            <form className="max-w-sm mx-4">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                onChange={(e) => handleSelect(e.target.value, totaldata)}
              >
                <option selected>Choose a company</option>
                {totaldata.map((item, index) => (
                  <option key={index} value={item.label} disabled={item.add}>
                    {item.label} {item.add ? "✔️" : ""}
                  </option>
                ))}
                <option selected>Add all</option>
              </select>
            </form>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add companies
        </button>
      </div>
    </>
  );
};

export default Graph;
