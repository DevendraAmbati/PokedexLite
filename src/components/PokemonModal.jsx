import React from "react";

const PokemonModal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded">
                <h2 className="capitalize text-xl">{pokemon.name}</h2>
                <p>HP: {pokemon.stats[0].base_stat}</p>
                <p>Attack: {pokemon.stats[1].base_stat}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PokemonModal;