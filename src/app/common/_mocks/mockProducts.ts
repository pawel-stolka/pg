import { Category, InsuranceType, Product } from "@common/models";

const _categories1: Category[] = [
  {
    categoryName: 'cat-1',
    insuranceDetails: [
      {
        type: InsuranceType.TEN_TIMES,
        insurances: [
          { insuranceId: '#1.0', price: 123, duration: '1.10' },
          { insuranceId: '#1.1', price: 12, duration: '1.11' },
          { insuranceId: '#1.2', price: 41, duration: '1.12' },
        ],
      },
    ],
  },
  {
    categoryName: 'cat-2',
    insuranceDetails: [
      {
        type: InsuranceType.TEN_TIMES,
        insurances: [
          { insuranceId: '#2.0', price: 33, duration: '1.20' },
          { insuranceId: '#2.1', price: 43, duration: '1.21' },
        ],
      },

    ],
  },
];
const _categories2: Category[] = [
  {
    categoryName: 'cat-3',
    insuranceDetails: [
      {
        type: InsuranceType.TEN_TIMES,
        insurances: [
          { insuranceId: '#3.0', price: 901, duration: '3.10' },
          { insuranceId: '#3.1', price: 12, duration: '3.11' },
          { insuranceId: '#3.2', price: 850, duration: '3.12' },
        ],
      },
    ],
  },
  {
    categoryName: 'cat-4',
    insuranceDetails: [
      {
        type: InsuranceType.TEN_TIMES,
        insurances: [
          { insuranceId: '#4.0', price: 901, duration: '4.10' },
          { insuranceId: '#4.1', price: 901, duration: '4.11' },
        ],
      },
    ],
  },
  {
    categoryName: 'cat-5',
    insuranceDetails: [
      {
        type: InsuranceType.TEN_TIMES,
        insurances: [
          { insuranceId: '#5.0', price: 153, duration: '5.10' },
          { insuranceId: '#5.1', price: 247, duration: '5.11' },
          { insuranceId: '#5.2', price: 932, duration: '5.12' },
          { insuranceId: '#5.3', price: 425, duration: '5.13' },

        ],
      },
    ],
  },
];

const _mockCategories: Category[][] = [_categories1, _categories2];

export const mockCategories = (id: number) => {
  return _mockCategories[id];
};

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
  // {
  //   plu: 'plu-3',
  //   benefits: mockBenefits[1],
  //   categories: mockCategories(1),
  // },
  // {
  //   plu: 'plu-4',
  //   benefits: mockBenefits[1],
  //   categories: mockCategories(1),
  // },
];
