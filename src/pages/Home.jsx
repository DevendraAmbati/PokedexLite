import React, { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../api/pokemonApi";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";

const TYPES = [
  "all",
  "fire",
  "water",
  "grass",
  "electric",
  "bug",
  "normal",
  "poison",
  "ground",
  "fairy",
  "flying",
  "psychic",
  "rock",
  "fighting",
  "ice",
  "dragon"
];

const Home = () => {
  const [pokemons, setPokemons] = useState(
    typeof window !== "undefined"
      ? window.__INITIAL_DATA__ || []
      : []
  );

  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const LIMIT = 20;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const res = await getPokemons(LIMIT, offset);

      const details = await Promise.all(
        res.data.results.map((p) => getPokemonDetails(p.url))
      );

      const data = details.map((d) => d.data);

      setPokemons(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleTypeToggle = (type) => {
    if (type === "all") {
      setSelectedTypes([]);
      return;
    }

    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  useEffect(() => {
    let result = pokemons;


    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (selectedType !== "all") {
      result = result.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)

      );
    }

    setFiltered(result);
  }, [search, selectedType, pokemons]);

  return (
    <section className="min-h-screen  relative p-4 pt-36 md:pt-20 max-w-350 mx-auto">

      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Pokedex Lite
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full md:w-72 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>

          </div>
        </div>
      </div>


      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="grid gap-6 my-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-2">
          {filtered.length > 0 ? (
            filtered.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p className="flex justify-center items-center min-h-96 col-span-full text-gray-600">
              No Pokémon found
            </p>
          )}
        </div>
      )}

      <Pagination
        onNext={() => setOffset(offset + LIMIT)}
        onPrev={() => setOffset(offset - LIMIT)}
        disablePrev={offset === 0}
      />
    </section>
  );
};

export default Home;