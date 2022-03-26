import { v4 as uuidv4 } from 'uuid';
import { TierMakerElement } from "./tier-maker-element.model";
import { CardRendererTypeEnum } from "../card-renderer-type-enum.model";
export interface TierList {
  id: string;
  name: string;
  description: string;
  tiers: Array<TierMakerElement>;
  unassignedImages: Array<string>;
}

export function getEmptyTierList(): TierList {
  return {
    id: uuidv4(),
    name: '',
    description: '',
    tiers: new Array<TierMakerElement>(),
    unassignedImages: new Array<string>(),
  }
}

export function getImageNumber(tierListInfo: TierList): number {
  let imageNumber = tierListInfo.unassignedImages.length;
  tierListInfo.tiers.forEach( (tierInfo) => {
    imageNumber += tierInfo.pictures.length;
  });
  return imageNumber;
}

export function tierListToCardJSON(tierListInfo: TierList): any {
    let imageNumber = getImageNumber(tierListInfo);
    return {
      title: tierListInfo.name,
      subtitle: tierListInfo.description,
      fields: [
        {
          type: CardRendererTypeEnum.TEXT_FIELD,
          data: `Tier Number: ${tierListInfo.tiers.length}`,
        },
        {
          type: CardRendererTypeEnum.TEXT_FIELD,
          data: `Image Number: ${imageNumber}`,
        },
      ]
    };
  }