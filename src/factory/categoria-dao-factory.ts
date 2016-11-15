import * as conn from './connection';
import { CategoriaDao } from '../dao/categoria-dao';

export const categoriaDao = new CategoriaDao(conn);
