export const getFavorites = () => {
  if (typeof window === "undefined") return []; // ✅ SSR safe

  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (data) => {
  if (typeof window === "undefined") return; // ✅ SSR safe

  localStorage.setItem("favorites", JSON.stringify(data));
};