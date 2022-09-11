export const getLatestNewsAPI = async (searchQuery: string) => {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=10&page=0`);
  return await res.json();
};

export const getPopularNewsAPI = async () => {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?query=&hitsPerPage=10&page=0`);
  return await res.json();
};
