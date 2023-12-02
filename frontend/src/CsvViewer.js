import React, { useState, useEffect } from "react";
import Search from "./Search";

const CsvViewer = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchData = () => {
    // Fetch data based on the current query only if the initial load is complete and a query is present
    if (initialLoadComplete && query.trim() !== "") {
      fetch(`http://3.109.206.134:3000/data?text=${query}`)
        .then((response) => response.json())
        .then((data) => setFilteredData(data));
    }
  };

  // Fetch data initially and then set up the interval
  useEffect(() => {
    const fetchDataInitially = async () => {
      // Fetch initial data only if the query is present
      if (query.trim() !== "") {
        const response = await fetch(`http://3.109.206.134:3000/data?text=${query}`);
        const initialData = await response.json();
        setFilteredData(initialData);
        setInitialLoadComplete(true);
      } else {
        setInitialLoadComplete(true);
      }
    };

    fetchDataInitially();

    // Set up an interval to refresh data every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [query]); // Include query in the dependency array to trigger a refresh when the query changes

  const handleSearch = (newQuery) => {
    // Update the query when the user performs a new search
    setQuery(newQuery);
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}>
      <br />
      <br />
      <h1 style={{ color: "#3498db" }}>Demo Data</h1>
      <br />
      <Search onSearch={handleSearch} /> <br />
      <br />
      <table id="data-table" border="1">
        <thead>
          <tr>
            {filteredData.length > 0 &&
              Object.keys(filteredData[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rowData, index) => (
            <tr key={index}>
              {Object.values(rowData).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvViewer;
