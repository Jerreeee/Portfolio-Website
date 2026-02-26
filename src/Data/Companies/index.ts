import type { ResumeTailoring } from '@/Types/resume-tailoring';
import guerrillaGamesTailoring from './GuerrillaGames';

const companyMap: Record<string, ResumeTailoring> = {
  GuerrillaGames: guerrillaGamesTailoring,
};

export function getTailoring(
  company: string | null | undefined,
): ResumeTailoring | undefined {
  if (!company) return undefined;
  return companyMap[Object.keys(companyMap).find(
    (key) => key.toLowerCase() === company.toLowerCase(),
  ) ?? ''];
}
