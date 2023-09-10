const admin = ({ env }: { env: any }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  auth: {
    secret: env('API_ADMIN_JWT_SECRET'),
  },
  transfer: {
    token: {
      salt: env('API_TRANSFER_TOKEN_SALT'),
    },
  },
});

export default admin;
