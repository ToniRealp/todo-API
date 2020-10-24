declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV?: 'production' | 'development' | 'testing';
      JWT_SECRET: string;
      POSTGRES_URL: string;
    }
  }
}

export {};
