export const setAddresses = (payload: string[]) => ({
  type: 'SET_ADDRESSES' as const,
  payload,
});

export const setLatestNewsError = (payload: string) => ({
  type: 'SET_ADDRESSES_ERROR' as const,
  payload,
});

export const getNews = () => ({
  type: 'GET_NEWS' as const,
});

export const setLoader = (payload: boolean) => ({
  type: 'SET_LOADER' as const,
  payload,
});
