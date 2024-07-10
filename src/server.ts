import app from './app';
import { sequelize } from './config/db-config';

const PORT =  3000;

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
