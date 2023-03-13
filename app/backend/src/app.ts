import * as express from 'express';
import { filterMatches,
  finishMatch,
  newMatch,
  updateMatch } from './database/controllers/matchesController';
import { sendAllTeams, sendOneTeam } from './database/controllers/teamsController';
import login, { userRole } from './database/controllers/usersController';
import validateNewMatch from './database/middlewares/validateNewMatch';
import validateToken from './database/middlewares/validateToken';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', sendAllTeams);
    this.app.get('/teams/:id', sendOneTeam);
    this.app.post('/login', login);
    this.app.get('/login/role', validateToken, userRole);
    this.app.get('/matches', filterMatches);
    this.app.patch('/matches/:id/finish', validateToken, finishMatch);
    this.app.patch('/matches/:id', validateToken, updateMatch);
    this.app.post('/matches', validateToken, validateNewMatch, newMatch);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
