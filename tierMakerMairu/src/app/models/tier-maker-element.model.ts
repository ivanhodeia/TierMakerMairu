import { v4 as uuidv4 } from 'uuid';

export interface TierMakerElement {
  id: string;
  name: string;
  pictures: Array<string>;
  color: string;
}

export function getEmptyTierMakerElement(): TierMakerElement {
    return {
        id: uuidv4(),
        name: '',
        pictures: new Array<string>(),
        color: '',
    }
}