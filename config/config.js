module.exports = {
  PORT: process.env.PORT || 8000,
  cookieSecret: 'nowdone',
  mongo: {
    'development': {
      connectionString: 'mongodb://localhost/qusaosao'
    },
    'production': {
      connectionString: 'mongodb://localhost/nowdone'
    },
    opts: {
      useMongoClient: true
    }
  }
}