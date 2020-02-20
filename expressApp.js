import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TRACING_CONSTANTS } from './util/app.constants';
import {
    loadConfig
} from './config/config';

import {
    PRODUCTION
} from './util/app.constants';
import router from './routes/app.router';




if (process.env.NODE_ENV !== PRODUCTION) {
    console.log('loading production configuration in app.ts');
    loadConfig();
}
let app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.set('etag', false);

const setTraceId = (req) => {
    if (req.headers.traceid) {
        TRACING_CONSTANTS.TRACE_ID = req.headers.traceid;
    }
};

app.use(function (req, res, next) {
    //if(req.url !== '/healthcheck' && req.url !== '/favicon.ico' ) {
      console.log(req.url);

      //TODO TraceId to be added in logs
      // Set TraceId
      setTraceId(req);

    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Pragma", "no-cache");
    res.header("cache-control", "no-cache");
    next();
});

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/', router);

app.get('/healthcheck', (req, res) => {
    res.status(200).send(true);
});

app.listen(process.env.PORT, function () {
    console.log('Server started on (BFF) ' + process.env.PORT);
});
