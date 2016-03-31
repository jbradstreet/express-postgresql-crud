// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/album-demo'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
