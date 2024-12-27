import { useState } from "react";
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

    if (states.some((state) => state === newState)) {
      SetError("State already exists");
      return;
    }

    setStates([...states, newState]);
    setNewState("");
    SetError("");
  };

  const addCity = () => {
    if (!newCity.trim()) {
      SetError("City name is required and it can not be empty");
      return;
    }

    if (!selectedState) {
      SetError("Please select a state for the city");
      return;
    }

    if (cities.some((city) => city.name === newCity)) {
      SetError("City already exists");
      return;
    }

    setCities([...cities, { name: newCity, state: selectedState }]);
    setNewCity("");
    setSlectedState("");
    SetError("");
  };

  const deleteCity = (index) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
  };

  const editCity = (cityIndex, cityName, newState) => {
    const updatedCities = [...cities];
    updatedCities[cityIndex] = { name: cityName, state: newState };
    setCities(updatedCities);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexofLastCity = currentPage * citiesPerPage;
  const indexofFirstCity = indexofLastCity - citiesPerPage;
  const currentCities = cities.slice(indexofFirstCity, indexofLastCity);
  const totalPages = Math.ceil(cities.length / citiesPerPage);

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

        <div>
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
            <option value="">Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <button onClick={addCity}>Add City</button>
        </div>
      </div>

      {error && <p>{error}</p>}

      <h2>City List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCities.map((city, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={city.name}
                  onChange={(e) => {
                    const updatedCities = [...cities];
                    updatedCities[indexofFirstCity + index].name = e.target.value;
                    setCities(updatedCities);
                  }}
                />
              </td>
              <td>
                <select
                  value={city.state}
                  onChange={(e) =>
                    editCity(indexofFirstCity + index, city.name, e.target.value)
                  }
                >
                  {states.map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => deleteCity(indexofFirstCity + index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </>
  );
}

export default App;
