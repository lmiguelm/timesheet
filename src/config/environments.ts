export const Environments = {
  application: {
    baseURL: process.env.BASE_URL,
  },
  auth: {
    next: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};
