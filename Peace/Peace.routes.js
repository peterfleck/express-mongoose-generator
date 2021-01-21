import { Router } from 'express';
const router = Router();
import {list, show, create, update, remove} from './Peace.controllers.js';
import { validatePeace } from "./Peace.validator.js";

router.get('/', list);
router.get('/:id', show);
router.post('/', validatePeace, create);
router.put('/:id', validatePeace, update);
router.delete('/:id', remove);

export default router;
