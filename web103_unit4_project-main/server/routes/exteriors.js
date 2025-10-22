import express from 'express'
import { getExteriors, getExteriorById } from '../controllers/exteriors.js'

const router = express.Router()

router.get('/', getExteriors)
router.get('/:id', getExteriorById)

export default router