const plugins = ({ env }: { env: any }) => ({
  'schemas-to-ts': {
    config: {
      acceptedNodeEnvs: ['development'],
      alwaysAddEnumSuffix: false,
      commonInterfacesFolderName: 'interfaces',
      verboseLogs: false,
    },
    enabled: true,
  },
  'users-permissions': {
    config: {
      jwtSecret: env('API_JWT_SECRET'),
    },
    enabled: true,
  },
});

export default plugins;
