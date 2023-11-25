// Interface automatically generated by schemas-to-ts

import {
  InstructionItem,
  InstructionItem_Plain,
  InstructionItem_NoRelations,
} from './InstructionItem';

export interface InstructionList {
  id: number;
  title?: string;
  items: InstructionItem[];
}
export interface InstructionList_Plain {
  id: number;
  title?: string;
  items: InstructionItem_Plain[];
}

export interface InstructionList_NoRelations {
  id: number;
  title?: string;
  items: InstructionItem_NoRelations[];
}
