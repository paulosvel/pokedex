import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setAllPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [pokemonPerPage, setPokemonPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPokemons() {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=2000`
    );
    setAllPokemons(response.data.results);
    setCurrentPokemon(response.data.results);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    async function getPokemonDetails() {
      const promises = currentPokemon.map(async (item) => {
        const response = await axios.get(item.url);
        const { name, types } = response.data;
        const id = item.url.split("/")[6];
        return { name, types, id };
      });
      const pokemonDetails = await Promise.all(promises);
      setCurrentPokemon(pokemonDetails);
    }
    getPokemonDetails();
  }, [currentPokemon]);

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  // Filtering
  const filteredPokemon = currentPokemon.filter((item) =>
    item.name.includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const Pokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <>
      <Box
        sx={{ paddingTop: "20px", display: "flex", justifyContent: "center" }}  
      >
        <TextField
          sx={{ width: "20%" }}
          label="Search Pokemon"
          value={search}
          onChange={handleChange}
        />
      </Box>
      <Box>
        {Pokemon.map((item) => {
          const pokemonId = item.url && item.url.split("/")[6];

          return (
            <>
              <Box>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                  alt={item.name}
                />
              </Box>
              <Box key={item.name}>
                {item.name}
                {item.types &&
                  item.types.map((type) => (
                    <span key={type.type.name}> {type.type.name}</span>
                  ))}
              </Box>
            </>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Button
          sx={{ width: "100px" }}
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <Button
          sx={{ width: "100px" }}
          variant="contained"
          disabled={Pokemon.length < pokemonPerPage}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default App;
