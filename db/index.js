///Connect to my comic-store database

const { Client } = require('pg');

const client = new Client(`postgres://tylerwright:root@localhost:5432/comic-store`);

module.exports = {
  client
}