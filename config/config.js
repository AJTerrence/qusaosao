module.exports = {
  PORT: process.env.PORT || 3000,
  cookieSecret: 'nowdone',
  mongo: {
    'development': {
      connectionString: 'mongodb://localhost/qusaosao'
    },
    'production': {
      connectionString: 'mongodb://localhost/qu'
    },
    /*
    opts: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }*/
    opts: {
      useMongoClient: true
    }
  }
}