import express, {Application} from 'express';
import morgan from 'morgan';

import routerAuth from '../routes/auth';

const app: Application = express();

//Settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/v1/auth', routerAuth);

export default app;