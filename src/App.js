import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Filter from "./components/Filter/Filter";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination.jsx";
import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetails from "./components/Cards/CardDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />
        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  //HOW TO FETCH DATA FROM A API STEP BY STEP.
  //1. it will update the api everytime there is a change.
  let [pageNumber, setPageNumber] = useState(1);

  //5. se crea otro estado para determinar la busqueda del personaje.
  let [search, setSearch] = useState("");

  // 6. se crea un estado para agregar la funcionalidad del filtro 'status'
  let [status, setStatus] = useState("");

  // 7. se crea un estado para agregar la funcionalidad del filtro 'gender'
  let [gender, setGender] = useState("");

  // 8. se crea un estado para agregar la funcionalidad del filtro 'species'
  let [species, setSpecies] = useState("");

  //3. this is another state to hold the character info.
  let [fetchedData, updateFetchedData] = useState([]);

  //destructuring the data from the api in to the variable.
  let { info, results } = fetchedData;

  //2. this will fetch the data and turn it into json
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  //4. this hook run a IIFE function to trasform the data from the API to json and add it to the  setFetchedData function.
  useEffect(() => {
    //this is a Inmedeatly Invoke Function Expresion.
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);

  return (
    <div className="App">
      <h1 className="text-center mb-4">Characters</h1>
      <Search setPageNumber={setPageNumber} setSearch={setSearch} />
      <div className="container">
        <div className="row">
          <Filter
            setSpecies={setSpecies}
            setGender={setGender}
            setStatus={setStatus}
            setPageNumber={setPageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              {/* 5. past the data in results trough props*/}
              <Cards page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default App;
