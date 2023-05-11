import { Product } from "@common/models";
import { mockCategories } from "./mockCategories";

const mockBenefits: string[][] = [
  ['będzie ok', 'zrobimy to', 'nie ma się czego bać'],
  ['róbta co chceta', 'lepiej uważać'],
  ['czas ucieka, wieczność czeka'],
];

export const mockProducts: Product[] = [
  {
    plu: 'plu-1',
    benefits: mockBenefits[0],
    categories: mockCategories(0),
  },
  {
    plu: 'plu-2',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
  {
    plu: 'plu-3',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
];
