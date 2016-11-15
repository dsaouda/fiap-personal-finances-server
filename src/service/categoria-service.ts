import {CategoriaDao} from '../dao/categoria-dao';

export class CategoriaService {
    private dao: CategoriaDao;

    constructor(categoriaDao: CategoriaDao) {
        this.dao = categoriaDao;
    }

    todas(request: any, response: any) {
        this.dao
            .todas
            .then((result: any) => response.json(result))
            .catch((error: any) => response.json(error));
    }
}
