export enum InsuranceType {
  ONE_TIME = 'ONE_TIME',
  TEN_TIMES = 'TEN_TIMES',
  SUBSCIPTION = 'SUBSCIPTION',
}
export interface InsuranceDetail {
  // id: number;
  insuranceId: string;
  type: InsuranceType;
  price: number;
  duration: string;
}

export interface Category {
  id: number;
  categoryName: string;
  insuranceDetails: InsuranceDetail[];
  durations?: string[];
}

export interface Product {
  plu: string;
  benefits: string[];
  categories: Category[];
}
