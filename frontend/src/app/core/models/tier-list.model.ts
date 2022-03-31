import { v4 as uuidv4 } from 'uuid';
import { Category } from '../enums';
import { TierItem, createEmptyTierItem } from './tier-item.model';

export interface TierList {
  id: string;
  description: string;
  banner?: string;
  title: string;
  items: Array<TierItem>;
  favorite: boolean;
  category?: Category;
  nPictures?: number;
  pictures?: Array<string>;
}

export function createEmptyTierList(n?): TierList {
  return {
    id: uuidv4(),
    description: '',
    category: Category.Random,
    nPictures: 10,
    title: 'Tier List',
    items: createRandomTierItems(n? n : 4),
    favorite: false
  }
}

function createRandomTierItems(n: number) {
  return new Array(n).fill(0).map(_ => createEmptyTierItem());
}
