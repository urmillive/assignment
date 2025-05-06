const app = require('./app');
const { log } = require('./utils/logger');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});
