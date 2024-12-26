import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [selectedState, setSlectedState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, SetError] = useState("");

  const citiesPerPage = 5;

  const addState = () => {
    if (!newState.trim()) {
      SetError("State name is required and it can not be empty");
      return;
    }

    if (states.some(state => state.name === newState)) {
      SetError("State already exists");
      return;
    }

    setStates([...states, newState]);
    setNewState("");
    SetError("");
  };


  const addCity = () => {
    if(!newCity.trim()){
      SetError("City name is required and it can not be empty");
      return;
    }

    if(cities.some(city => city.name === newCity)){
      SetError("City already exists");
      return;
    }

    setCities([...cities, {name: newCity, state: selectedState}]);
    setNewCity("");
    setSlectedState("");
    SetError("");
  }

  const deleteCity = (index) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
  }

  const nextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const previousPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Logic for pagination
  const indexofLastCity = currentPage * citiesPerPage;
  const indexofFirstCity = indexofLastCity - citiesPerPage;
  const currentCities = cities.slice(indexofFirstCity, indexofLastCity);
  const totalPages = Math.ceil(cities.length / citiesPerPage);

  // Things to do
  // 1. citites
  // 2.states
  // 3. New state
  // 4. edit option
  // 5. delete option
  // 6. pagination or showing pages
  // 7. Error Handling
  // 8. Have to show 5 cities per pages

  return (
    <>
      <div>
        <h1>Manage your city</h1>
        <div>
          <h2>Add State</h2>
          <input
            type="text"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Enter state name"
          />
          <button onClick={addState}>Add State</button>
        </div>

        <h2>Add City</h2>
        <input
          type="text"
          placeholder="Enter City Name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />

        <select
          value={selectedState}
          onChange={(e) => setSlectedState(e.target.value)}
        >
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button onClick={addCity}>Add City</button>
      </div>

      {error && <p>{error}</p>}

      <h2>City List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {currentCities.map((city, index) => (
            <tr>
              <td>
                <input type="text" value={city.name} onChange={(e) => {setCities(e.target.value)}} />
              </td>
              <td>
                <select value={city.state} onChange={(e) => {editCity(indexofFirstCity + index , city.name , e.target.value)}}>
                  {states.map((state,index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => deleteCity(indexofFirstCity + index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div>
          <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(cities.length / citiesPerPage)}>Next Page</button>
      </div>
    </>
  );
}

export default App;
