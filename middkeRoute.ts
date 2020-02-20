import { Router } from "express";
import * as express from 'express';
var jwtDecode = require('jwt-decode');

let router: Router = express.Router();

const validateRequest = (req) => {
    if (req.headers["authorization"]) {
        try {
            let token = req.headers["authorization"];
            let decodedToken = jwtDecode(token);
            req.tokenData = decodedToken;
        }
        catch (err) {
            console.log(`An error has happend while trying to decode the token!`)
        }
    }
}

const validationMiddleware = function (req, res, next) {
    let status = validateRequest(req)
    if (status == false) {
        res.status(401).send({ message: `Unauthorized request!` });
        return;
    }
    next();
}

let routes: Router[] = [userRoutes, reportRoutes];

routes.forEach(route => {

    router.use('/fallback/test/:storeId', [validationMiddleware, route]);
    router.use('/fallback/:apiversion/test/:testId', [validationMiddleware, route]);
    router.use('/services', route);


});



export default router;
