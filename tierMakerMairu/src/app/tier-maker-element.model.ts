export interface TierMakerElement {
  name: string;
  position: number;
  pictures: Array<string>;
  color: string;
}

export function getEmptyTierMakerElement(): TierMakerElement {
    return {
        name: '',
        position: -1,
        pictures: new Array<string>(),
        color: '',
    }
}