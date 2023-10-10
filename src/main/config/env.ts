export default {
  postgresUrl: process.env.POSTGRES_URL || 'postgresql://admin:admin@localhost:5555/brisanet_challenger',
  port: process.env.PORT || 5050
}
