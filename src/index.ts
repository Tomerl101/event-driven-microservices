import 'dotenv/config';
import App from './app';

console.log('start server');
const app = new App();
app.listen();
