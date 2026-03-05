import type { ResumeTailoring } from '@/Types/resume-tailoring';
import guerrillaGamesTailoring from './GuerrillaGames';

const defaultTailoring: ResumeTailoring = {
  experience: {
    projects: {
      'ISS Docking Simulator - Team Project': {
        exclude: true,
      },
    },
  },
};

const companyMap: Record<string, ResumeTailoring> = {
  GuerrillaGames: guerrillaGamesTailoring,
};

export function getTailoring(
  company: string | null | undefined,
): ResumeTailoring | undefined {
  if (!company) return defaultTailoring;
  return companyMap[Object.keys(companyMap).find(
    (key) => key.toLowerCase() === company.toLowerCase(),
  ) ?? ''];
}
