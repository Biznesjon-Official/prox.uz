module.exports = {
  apps: [
    {
      name: 'prox-uz-backend',
      script: './server/dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5004,
        JWT_SECRET: 'prox-uz-super-secret-key-2024-production',
        JWT_EXPIRE: '7d',
        MONGODB_URI: 'mongodb+srv://CRM_group_12coder:HxFIrM4Ge66tde9Z@cluster1.viyjahc.mongodb.net/prox_crm?retryWrites=true&w=majority',
        CLIENT_URL: 'https://prox.uz'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      watch: false
    }
  ]
};
