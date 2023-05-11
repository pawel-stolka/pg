import { Category, InsuranceType } from '@common/models';

const _categories1: Category[] = [
  {
    id: 0,
    categoryName: 'cat-1',
    insuranceDetails: [
      {
        insuranceId: '#1.0',
        type: InsuranceType.TEN_TIMES,
        price: 123,
        duration: '3',
      },
      {
        insuranceId: '#1.1',
        type: InsuranceType.TEN_TIMES,
        price: 456,
        duration: '5',
      },
    ],
  },
  {
    id: 1,
    categoryName: 'cat-2',
    insuranceDetails: [
      {
        insuranceId: '#2.0',
        type: InsuranceType.TEN_TIMES,
        price: 456,
        duration: '5',
      },
      {
        insuranceId: '#2.1',
        type: InsuranceType.TEN_TIMES,
        price: 789,
        duration: '7',
      },
    ],
  },
];
const _categories2: Category[] = [
  {
    id: 0,
    categoryName: 'cat-3',
    insuranceDetails: [
      {
        insuranceId: '#1.0',
        type: InsuranceType.TEN_TIMES,
        price: 901,
        duration: '9',
      },
      {
        insuranceId: '#1.1',
        type: InsuranceType.TEN_TIMES,
        price: 1024,
        duration: '11',
      },
    ],
  },
];

const _mockCategories: Category[][] = [_categories1, _categories2];
export const mockCategories = (id: number) => {
  return _mockCategories[id];
};
