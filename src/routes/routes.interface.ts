import { Router } from 'express';

interface IRoute {
  baseUrl?: string;
  router: Router;
}

export default IRoute;
