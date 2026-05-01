import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const typeColors = {
  fire: "bg-red-400",
  water: "bg-blue-400",
  grass: "bg-green-400",
  electric: "bg-yellow-400",
  bug: "bg-lime-400",
  poison: "bg-purple-400",
  normal: "bg-gray-400",
  fairy: "bg-pink-400",
};

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  const mainType = pokemon.types[0].type.name;

  return (
    <div
      className={`min-h-screen p-4 bg-gradient-to-br ${typeColors[mainType] || "from-gray-300 to-gray-500"
        }`}
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white mb-6 bg-white/20 backdrop-blur px-4 py-2 rounded-full hover:bg-white/30 transition"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-6">

        <div className="flex justify-center -mt-20">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="h-40 drop-shadow-lg"
          />
        </div>

        <h1 className="text-3xl font-bold text-center capitalize mt-2">
          {pokemon.name}
        </h1>

        <p className="text-center text-gray-400 mb-3">
          #{pokemon.id}
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 text-sm text-white rounded-full bg-gray-600 capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${stat.base_stat}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-around mt-6 text-center">
          <div>
            <p className="text-gray-400 text-sm">Height</p>
            <p className="font-semibold">{pokemon.height}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Weight</p>
            <p className="font-semibold">{pokemon.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;