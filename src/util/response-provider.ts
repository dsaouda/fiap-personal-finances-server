import {Response} from 'express';

export class ResponseProvider {

    constructor(private response: Response, private promise: any) {
        promise
            .then((result: any) => response.json(result))
            .catch((error: any) => response.status(500).json(error));
    }


}
