const server = ({ env }: { env: any }) => ({
  app: {
    keys: env.array('API_APP_KEYS'),
  },
  host: env('API_HOST'),
  port: env.int('API_PORT'),
});

export default server;
