import { Router } from 'express';
import { chatWithSubjectTutor } from '../controllers/subjectTutorController';

const router = Router();

router.post('/chat', chatWithSubjectTutor);

export default router;
