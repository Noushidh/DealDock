export const getAuthHeader = (token: string | null) => ({
  headers: {
    Authorization: token,
  },
});