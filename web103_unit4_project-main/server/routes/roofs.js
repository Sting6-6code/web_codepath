import express from 'express'
import { getRoofs, getRoofById } from '../controllers/roofs.js'

const router = express.Router()

router.get('/',getRoofs)
router.get('/:id',getRoofById)

export default router