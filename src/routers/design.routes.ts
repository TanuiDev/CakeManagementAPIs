import express from 'express';
import {
  getAllDesigns,
  getDesign,
  createDesign,
  updateDesign,
  deleteDesign
} from '../Controllers/design.controller';

const router = express.Router();

router.get('/', getAllDesigns);          // GET all designs
router.get('/:id', getDesign);           // GET one design
router.post('/', createDesign);          // CREATE new design
router.put('/:id', updateDesign);        // UPDATE design
router.delete('/:id', deleteDesign);     // DELETE design

export default router;
