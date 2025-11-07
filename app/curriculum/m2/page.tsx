import Curriculum from '@/components/Curriculum';
import { getQuestionsByLevel } from '@/lib/questions';

export default function M2CurriculumPage() {
  const m2Questions = getQuestionsByLevel('M2');

  return <Curriculum questions={m2Questions} level="M2" />;
}
