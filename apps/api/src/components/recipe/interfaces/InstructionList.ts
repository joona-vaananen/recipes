// Interface automatically generated by schemas-to-ts

import {
  InstructionItem,
  InstructionItem_NoRelations,
  InstructionItem_Plain,
} from './InstructionItem';

export interface InstructionList {
  title?: string;
  items: InstructionItem[];
}
export interface InstructionList_Plain {
  title?: string;
  items: InstructionItem_Plain[];
}

export interface InstructionList_NoRelations {
  title?: string;
  items: InstructionItem_NoRelations[];
}
