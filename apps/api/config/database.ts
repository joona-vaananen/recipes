const database = ({ env }: { env: any }) => ({
  connection: {
    client: 'postgres',
    connection: {
      database: env('DB_NAME'),
      host: env('DB_HOST'),
      password: env('DB_PASSWORD'),
      port: env.int('DB_PORT'),
      user: env('DB_USERNAME'),
    },
  },
});

export default database;
