const plugins = ({ env }: { env: any }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('API_JWT_SECRET'),
    },
  },
});

export default plugins;
