import { useState, useEffect } from "react";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const isFav = favorites.includes(pokemon.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    let updated;
    if (isFav) {
      updated = favorites.filter((id) => id !== pokemon.id);
    } else {
      updated = [...favorites, pokemon.id];
    }

    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className="group cursor-pointer relative bg-white rounded-3xl shadow-sm p-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 active:scale-95 transition"
      >
        {isFav ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 group-hover:text-red-400" />
        )}
      </button>

      <span className="absolute top-3 left-3 text-xs font-medium text-gray-400">
        #{pokemon.id}
      </span>

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 mb-4 flex items-center justify-center">
        <img
          src={
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="h-24 w-24 object-contain transform group-hover:scale-110 transition duration-300"
        />
      </div>

      <h3 className="capitalize font-semibold text-lg text-center tracking-wide">
        {pokemon.name}
      </h3>

      <div className="flex justify-center gap-2 mt-3 flex-wrap">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm ${typeColors[t.type.name] || "bg-gray-500"
              }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-blue-100 via-transparent to-purple-100 transition pointer-events-none"></div>
    </div>
  );
};

export default PokemonCard;