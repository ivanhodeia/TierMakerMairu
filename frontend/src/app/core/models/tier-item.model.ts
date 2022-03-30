import { v4 as uuidv4 } from 'uuid';

export interface TierItem {
  id: string,
  color: string,
  text: string,
  pictures: Array<string>
}

export function createEmptyTierItem(): TierItem {
  return {
    id: uuidv4(),
    color: generateRandomColor(),
    text: 'Nuevo',
    pictures: []
  }
}

export function isColorValid(color: string) {
  return CSS.supports('color', color);
}

export function generateRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
