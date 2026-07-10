// utils/authHeader.ts
export const getAuthHeader = (token: string|null) => {
  return {
    headers: {
      Authorization: token?`${token}`:null,
    },
  };
};