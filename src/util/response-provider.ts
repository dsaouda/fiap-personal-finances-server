import {Response} from 'express';

export class ResponseProvider {

    constructor(response: Response, promise: any, code?: number) {
        code = code ? code : 200;

        promise
            .then((result: any) => {
                response.status(code).json(result)
            })
            .catch((error: any) => {
                response.status(500).json(error)
            });
    }
}
