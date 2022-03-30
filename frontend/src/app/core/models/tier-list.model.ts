import { v4 as uuidv4 } from 'uuid';
import { Category } from '../enums';
import { TierItem, createEmptyTierItem } from './tier-item.model';

export interface TierList {
  id: string;
  description: string;
  banner?: string;
  category: Category;
  nPictures: number;
  title: string;
  items: Array<TierItem>;
  favorite: boolean;
}

export function createEmptyTierList(n?): TierList {
  return {
    id: uuidv4(),
    description: '',
    category: Category.Custom,
    nPictures: 0,
    title: 'Tier List',
    items: createRandomTierItems(n? n : 4),
    favorite: false
  }
}

function createRandomTierItems(n: number) {
  return new Array(n).fill(0).map(_ => createEmptyTierItem());
}
