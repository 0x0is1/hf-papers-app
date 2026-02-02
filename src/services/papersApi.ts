const BASE_URL = "https://huggingface.co";
const HF_BASE_URL = "https://huggingface.co";
const TIMEOUT = 15000;

/* -------------------- Types -------------------- */

export interface Author {
  _id: string;
  name: string;
  user: {
    avatarUrl?: string;
    fullname: string;
    name: string;
    isPro?: boolean;
  };
}

export interface Paper {
  _id: string;
  arxivId: string;
  title: string;
  publishedAt: string;
  summary?: string;
  upvotes: number;
  numComments: number;
  thumbnail?: string;
  authors: Author[];
  mediaUrls?: string[];
  arxivUrl?: string;
  pdfUrl?: string;
  githubUrl?: string;
  submittedBy?: {
    avatarUrl?: string;
    fullname: string;
    name: string;
  };
}

export interface DailyPapersResponse {
  papers: Paper[];
  numTotalItems: number;
}

export interface SearchResponse {
  papers: Paper[];
}

export interface PaperDetails extends Paper {
  abstract?: string;
  comments?: any[];
  relatedModels?: any[];
  relatedDatasets?: any[];
  relatedSpaces?: any[];
}

/* -------------------- Helpers -------------------- */

function normalizeAvatarUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${HF_BASE_URL}${url}`;
  return undefined;
}

function normalizeAuthor(raw: any): Author {
  const user = raw?.user ?? {};
  return {
    _id: raw?._id ?? "",
    name: raw?.name ?? user?.fullname ?? user?.name ?? "Unknown author",
    user: {
      avatarUrl: normalizeAvatarUrl(user?.avatarUrl),
      fullname: user?.fullname ?? raw?.name ?? "Unknown author",
      name: user?.name ?? raw?.name ?? "unknown",
      isPro: Boolean(user?.isPro),
    },
  };
}

function normalizePaper(raw: any): Paper {
  const paper = raw.paper ?? raw;
  return {
    _id: paper._id ?? paper.id ?? "",
    arxivId: paper.id ?? paper.arxivId ?? "",
    title: paper.title,
    publishedAt: paper.publishedAt,
    summary: paper.summary,
    upvotes: paper.upvotes ?? 0,
    numComments: raw.numComments ?? paper.numComments ?? 0,
    thumbnail: raw.thumbnail ?? paper.thumbnail,
    authors: Array.isArray(paper.authors)
      ? paper.authors.map(normalizeAuthor)
      : [],
    mediaUrls: paper.mediaUrls,
    githubUrl: paper.githubRepo,
    submittedBy: paper.submittedOnDailyBy
      ? {
          avatarUrl: normalizeAvatarUrl(
            paper.submittedOnDailyBy.avatarUrl
          ),
          fullname: paper.submittedOnDailyBy.fullname,
          name: paper.submittedOnDailyBy.user,
        }
      : undefined,
  };
}

function buildQuery(params?: Record<string, any>) {
  if (!params) return "";
  const query = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  return query ? `?${query}` : "";
}

async function fetchJSON<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

/* -------------------- Service -------------------- */

class PapersAPIService {
  async getDailyPapers(
    date?: string,
    limit: number = 50
  ): Promise<DailyPapersResponse> {
    const params: any = { limit };
    if (date) params.date = date;

    const url = `${BASE_URL}/api/daily_papers${buildQuery(params)}`;
    const raw = await fetchJSON<any[]>(url);

    const papers = raw.map(normalizePaper);

    return {
      papers,
      numTotalItems: papers.length,
    };
  }

  async searchPapers(query: string): Promise<SearchResponse> {
    const url = `${BASE_URL}/api/papers/search${buildQuery({ q: query })}`;
    const raw = await fetchJSON<any>(url);

    const papers = Array.isArray(raw)
      ? raw.map(normalizePaper)
      : raw.papers?.map(normalizePaper) ?? [];

    return { papers };
  }

  async getPaperDetails(arxivId: string): Promise<PaperDetails> {
    const url = `${BASE_URL}/api/papers/${arxivId}`;
    const raw = await fetchJSON<any>(url);
    return normalizePaper(raw);
  }

  async getTrendingPapers(limit: number = 50): Promise<Paper[]> {
    const res = await this.getDailyPapers(undefined, limit);
    return [...res.papers].sort((a, b) => b.upvotes - a.upvotes);
  }

  async getRecentPapers(limit: number = 50): Promise<Paper[]> {
    const res = await this.getDailyPapers(undefined, limit);
    return [...res.papers].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
  }

  getArxivUrl(arxivId: string): string {
    return `https://arxiv.org/abs/${arxivId}`;
  }

  getPdfUrl(arxivId: string): string {
    return `https://arxiv.org/pdf/${arxivId}.pdf`;
  }
}

export default new PapersAPIService();
