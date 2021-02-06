import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import Debug from 'debug';
const debug = Debug(`${process.env.SERVICE_ID}`);
import MessageRoutes from './routes/messages.routes';
import IRoute from './routes/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import MessagesController from './controllers/messages.controller';
import MessageService from './services/messages.service';
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public serviceId: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'dev';
    this.serviceId = process.env.SERVICE_ID || 'randomServiceId';

    this.initializeMiddlewares();
    this.initializeRoutes([new MessageRoutes(new MessagesController(new MessageService()))]); // TODO: better DI..
    this.initializeErrorHandling(); // Need to be last, initialize after all routes
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('app listening on port...');
      debug(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    console.log('Initialize middlewares');
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
