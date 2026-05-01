Pokedex Lite

A responsive React-based Pokémon browser that allows users to explore Pokémon with search, pagination, and type-based filtering.

Live Demo

https://your-vercel-url.vercel.app

Features

 Search Pokémon by name
 Filter Pokémon by type (Fire, Water, etc.)
 Pagination for browsing
 Fast API fetching with loading skeleton
 Fully responsive UI

Technologies Used

1. React.js
Used for building UI with reusable components
Hooks like useState and useEffect for state management
2. Tailwind CSS
Utility-first CSS framework
Helps build responsive and clean UI quickly
3. Axios
Used for API calls
Handles asynchronous requests efficiently
4. PokeAPI
Public API used to fetch Pokémon data

Installation & Setup

Clone the repository:

git clone https://github.com/DevendraAmbati/PokedexLite.git
cd pokedex-lite

Install dependencies:

npm install

Run the app:

npm run dev


How It Works
Pokémon data is fetched using API calls.
Each Pokémon's detailed data is retrieved using Promise.all.
Search and type filtering are combined using React state.
Filtering logic is handled inside a useEffect hook.


GitHub Repo:
https://github.com/your-username/pokedex-lite

Live URL:
https://pokedex-lite.vercel.app

Author

Devendra Ambati
Frontend Developer (React.js)
