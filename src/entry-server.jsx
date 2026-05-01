import { renderToString } from "react-dom/server";
import App from "./App";
import axios from "axios";

export async function render(url) {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const initialData = res.data.results;

  const appHtml = renderToString(
    <App initialData={initialData} />
  );

  return { appHtml, initialData }; 
}