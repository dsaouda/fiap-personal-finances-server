import {categoriaDao as dao} from './categoria-dao-factory';
import { CategoriaService } from '../service/categoria-service';

export const categoriaService = new CategoriaService(dao);
