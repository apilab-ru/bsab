export enum FilterKey {
   bpmFrom = 'bpmFrom',
   bpmTo = 'bpmTo',
   dateFrom = 'dateFrom',
   npsFrom = 'npsFrom',
   npsTo = 'npsTo',
   search = 'search',
   tags = 'tags',
   showed = 'showed',
   recommended = 'recommended'
}

export interface FilterRequest {
   tagsPositive?: number[];
   tagsNegative?: number[];
   search?: string;
   npsFrom?: string;
   npsTo?: string;
   dateFrom?: string;
   showed?: string;
}

export interface Tag {
   id: number;
   name: string;
}

export enum OrderField {
   createdAt = 'createdAt',
   minNps = 'minNps',
   maxNps = 'maxNps',
   bpm = 'bpm',
   score = 'score',
}

export enum OrderDirection {
   asc = 'asc',
   desc = 'desc',
}
