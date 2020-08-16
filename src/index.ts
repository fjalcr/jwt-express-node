import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './db';

function init(){
    app.listen(app.get('port'));
}

init();
