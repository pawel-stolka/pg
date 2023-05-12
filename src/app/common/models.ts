export enum InsuranceType {
  ONE_TIME = 'ONE_TIME',
  TEN_TIMES = 'TEN_TIMES',
  SUBSCIPTION = 'SUBSCIPTION',
}
export interface Insurance {
  insuranceId: string;
  price: number;
  duration: string;
}
export interface InsuranceDetail {
  type: InsuranceType;
  insurances: Insurance[];
}

export interface Category {
  id?: number;
  categoryName: string;
  insuranceDetails: InsuranceDetail[];
  durations?: string[];
}

export interface Product {
  plu: string;
  benefits: string[];
  categories: Category[];
}

export interface CatDur {
  categoryName: string;
  currentDuration: string;
}
export interface PluCats {
  plu: string;
  categories: CatDur[];
}
export interface PluCatDur {
  plu: string;
  category: CatDur;
}
