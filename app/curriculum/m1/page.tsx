import Curriculum from '@/components/Curriculum';
import { getQuestionsByLevel } from '@/lib/questions';

export default function M1CurriculumPage() {
  const m1Questions = getQuestionsByLevel('M1');

  return <Curriculum questions={m1Questions} level="M1" />;
}
