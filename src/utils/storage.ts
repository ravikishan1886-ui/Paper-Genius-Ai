import { GeneratedPaper } from '../types/paper';
import { DEMO_PREGENERATED_PAPER } from '../data/sampleData';

const STORAGE_KEY = 'papergenius_papers_v1';

export function getSavedPapers(): GeneratedPaper[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample paper on first launch
      const seeded = [DEMO_PREGENERATED_PAPER];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [DEMO_PREGENERATED_PAPER];
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return [DEMO_PREGENERATED_PAPER];
  }
}

export function savePaper(paper: GeneratedPaper): void {
  try {
    const current = getSavedPapers();
    const existingIndex = current.findIndex((p) => p.id === paper.id);
    const updated = {
      ...paper,
      updatedAt: new Date().toISOString(),
    };

    let nextList: GeneratedPaper[];
    if (existingIndex >= 0) {
      nextList = [...current];
      nextList[existingIndex] = updated;
    } else {
      nextList = [updated, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  } catch (err) {
    console.error('Failed to save paper to localStorage:', err);
  }
}

export function deletePaper(paperId: string): GeneratedPaper[] {
  try {
    const current = getSavedPapers();
    const filtered = current.filter((p) => p.id !== paperId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete paper:', err);
    return [];
  }
}

export function duplicatePaper(paperId: string): GeneratedPaper | null {
  try {
    const current = getSavedPapers();
    const target = current.find((p) => p.id === paperId);
    if (!target) return null;

    const copy: GeneratedPaper = {
      ...JSON.parse(JSON.stringify(target)),
      id: 'pg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextList = [copy, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    return copy;
  } catch (err) {
    console.error('Failed to duplicate paper:', err);
    return null;
  }
}

export function clearAllLocalPapers(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear local papers:', err);
  }
}

export function exportAllLocalPapersJson(): string {
  const papers = getSavedPapers();
  return JSON.stringify({
    exportedAt: new Date().toISOString(),
    generator: 'PaperGenius AI',
    papersCount: papers.length,
    papers,
  }, null, 2);
}

