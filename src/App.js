import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import logo from "./logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clear, Close } from "@mui/icons-material";
import bug from "./typeimgs/Bug type.png";
import fire from "./typeimgs/Fire type.png";
import grass from "./typeimgs/Grass type.png";
import flying from "./typeimgs/Flying type.png";
import fighting from "./typeimgs/Fighting type.png";
import poison from "./typeimgs/Poison type.png";
import ground from "./typeimgs/Ground type.png";
import rock from "./typeimgs/Rock type.png";
import water from "./typeimgs/Water type.png";
import psychic from "./typeimgs/Psychic type.png";
import dragon from "./typeimgs/Dragon type.png";
import electric from "./typeimgs/Electric type.png";
import fairy from "./typeimgs/Fairy type.png";
import normal from "./typeimgs/Normal type.png";
import ghost from "./typeimgs/Ghost type.png";
import steel from "./typeimgs/Steel type.png";
import ice from "./typeimgs/Ice type.png";
import dark from "./typeimgs/Dark type.png";
import ClearIcon from "@mui/icons-material/Clear";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";

function App() {
  const [pokemon, setAllPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [pokemonPerPage, setPokemonPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentType, setCurrentType] = useState([]);

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

  const linkedinlink = () => {
    window.open("https://www.linkedin.com/in/paulos-velissarakos", "_blank");
  };

  const githublink = () => {
    window.open("https://github.com/paulosvel", "_blank");
  };

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
  }, [currentPokemon, currentType]);

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

  const handleChangeType = (event) => {
    const value = event.target.value;
    if (value === "clear") {
      setCurrentType("");
    } else {
      setCurrentType(value);
    }
  };

  const filteredTypes =
    currentType.length > 0
      ? filteredPokemon.filter((item) =>
          item.types.some((type) =>
            type.type.name.toLowerCase().includes(currentType.toLowerCase())
          )
        )
      : filteredPokemon;

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const Pokemon = filteredTypes.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: "0.5rem",
          margin: "10px",
        }}
      >
        <GitHub
          onClick={githublink}
          sx={{ color: "white", cursor: "pointer" }}
        ></GitHub>
        <LinkedInIcon
          onClick={linkedinlink}
          sx={{ color: "white", cursor: "pointer" }}
        ></LinkedInIcon>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <img width="250px" height="auto" src={logo}></img>
      </Box>
      <Box
        sx={{ paddingTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <FormControl variant="standard">
          <InputLabel>Filter By Type</InputLabel>
          <Select
            value={currentType}
            onChange={handleChangeType}
            sx={{ marginRight: "30px", width: "150px" }}
          >
            <MenuItem
              sx={{
                marginTop: "-8px",
                backgroundColor: "#DE5C32",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="clear"
            >
              <ClearIcon sx={{ width: "20px", height: "20px" }}></ClearIcon>
              Clear
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#F5D447",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="electric"
            >
              <img style={{}} src={electric} width="20px" height="20px"></img>
              Electric
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#4F91D7",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="water"
            >
              <img style={{}} src={water} width="20px" height="20px"></img>
              Water
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#F19D52",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="fire"
            >
              <img style={{}} src={fire} width="20px" height="20px"></img>
              Fire
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#92C33B",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="grass"
            >
              <img style={{}} src={grass} width="20px" height="20px"></img>
              Grass
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#73CFC1",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="ice"
            >
              <img style={{}} src={ice} width="20px" height="20px"></img>
              Ice
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#CF3F6B",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="fighting"
            >
              <img style={{}} src={fighting} width="20px" height="20px"></img>
              Fighting
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#AC6BCA",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="poison"
            >
              <img style={{}} src={poison} width="20px" height="20px"></img>
              Poison
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#DA7943",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="ground"
            >
              <img style={{}} src={ground} width="20px" height="20px"></img>
              Ground
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#91ABDF",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="flying"
            >
              <img style={{}} src={flying} width="20px" height="20px"></img>
              Flying
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#ED7079",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="psychic"
            >
              <img style={{}} src={psychic} width="20px" height="20px"></img>
              Psychic
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#92C33B",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="bug"
            >
              <img style={{}} src={bug} width="20px" height="20px"></img>
              Bug
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#C6B88D",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="rock"
            >
              <img style={{}} src={rock} width="20px" height="20px"></img>
              Rock
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#5169AE",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="ghost"
            >
              <img style={{}} src={ghost} width="20px" height="20px"></img>
              Ghost
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#2F6EC4",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="dragon"
            >
              <img style={{}} src={dragon} width="20px" height="20px"></img>
              Dragon
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#595365",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="dark"
            >
              <img style={{}} src={dark} width="20px" height="20px"></img>
              Dark
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: "#668EA1",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="steel"
            >
              <img style={{}} src={steel} width="20px" height="20px"></img>
              Steel
            </MenuItem>
            <MenuItem
              sx={{
                marginBottom: "-8px",
                backgroundColor: "#EC90E7",
                border: "2px solid black",
                gap: "0.5rem",
                padding: "2px",
              }}
              value="fairy"
            >
              <img style={{}} src={fairy} width="20px" height="20px"></img>
              Fairy
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "20%" }}
          label="Search Pokemon"
          value={search}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Pokemon.map((item) => {
          const pokemonId = item.url && item.url.split("/")[6];
          const backgroundColor =
            item.types &&
            (item.types[0].type.name === "electric"
              ? "#F5D447"
              : item.types[0].type.name === "grass"
              ? "#92C33B"
              : item.types[0].type.name === "poison"
              ? "#AC6BCA"
              : item.types[0].type.name === "bug"
              ? "#92C33B"
              : item.types[0].type.name === "normal"
              ? "#949BA3"
              : item.types[0].type.name === "fire"
              ? "#F19D52"
              : item.types[0].type.name === "water"
              ? "#4F91D7"
              : item.types[0].type.name === "fighting"
              ? "#CF3F6B"
              : item.types[0].type.name === "ground"
              ? "#DA7943"
              : item.types[0].type.name === "psychic"
              ? "#ED7079"
              : item.types[0].type.name === "rock"
              ? "#C6B88D"
              : item.types[0].type.name === "ghost"
              ? "#5169AE"
              : item.types[0].type.name === "dragon"
              ? "#2F6EC4"
              : item.types[0].type.name === "dark"
              ? "#595365"
              : item.types[0].type.name === "steel"
              ? "#668EA1"
              : item.types[0].type.name === "fairy"
              ? "#EC90E7"
              : item.types[0].type.name === "ice"
              ? "#73CFC1"
              : item.types[0].type.name === "flying"
              ? "#91ABDF"
              : "white");

          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "20%",
                  flexDirection: "row",
                  backgroundColor: backgroundColor,
                  margin: "20px",
                  borderRadius: "1rem",
                }}
              >
                <Box>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                    alt={item.name}
                  />
                </Box>
                <Box key={item.name}>
                  <Box sx={{ fontFamily: "Cursive", fontWeight: "500" }}>
                    {item.name}
                  </Box>
                  <Box>
                    {item.types &&
                      item.types.map((type) => (
                        <span
                          style={{ fontFamily: "Montserrat" }}
                          key={type.type.name}
                        >
                          {" "}
                          {type.type.name}
                        </span>
                      ))}
                  </Box>
                </Box>
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
          sx={{ width: "100px", backgroundColor: "#de5c32" }}
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <Button
          sx={{ width: "100px", backgroundColor: "#de5c32" }}
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
