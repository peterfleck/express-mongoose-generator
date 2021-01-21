import { Router } from 'express';
const router = Router();
import {list, show, create, update, remove} from {controllerPath};
import { validate{modelNameCap} } from "./{modelName}.validator.js";

router.get('/', list);
router.get('/:id', show);
router.post('/', validate{modelNameCap}, create);
router.put('/:id', validate{modelNameCap}, update);
router.delete('/:id', remove);

export default router;
