import express from 'express'
import { getInteriors, getInteriorById } from '../controllers/interiors.js'

const router = express.Router()

router.get('/',getInteriors)
router.get('/:id',getInteriorById)

export default router