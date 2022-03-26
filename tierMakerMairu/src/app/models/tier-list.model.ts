import { v4 as uuidv4 } from 'uuid';
import { TierMakerElement } from "./tier-maker-element.model";

export interface TierList {
  id: string;
  name: string;
  description: string;
  tiers: Array<TierMakerElement>;
}

export function getEmptyTierList(): TierList {
  return {
      id: uuidv4(),
      name: '',
      description: '',
      tiers: new Array<TierMakerElement>(),
  }
}
