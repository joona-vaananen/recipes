// Interface automatically generated by schemas-to-ts

import { Media } from '../../../common/interfaces/Media';
import { CtaButton, CtaButton_NoRelations, CtaButton_Plain } from './CtaButton';

export interface Hero {
  title?: string;
  description?: string;
  backgroundImage?: { data: Media };
  ctaButtons: CtaButton[];
}
export interface Hero_Plain {
  title?: string;
  description?: string;
  backgroundImage?: Media;
  ctaButtons: CtaButton_Plain[];
}

export interface Hero_NoRelations {
  title?: string;
  description?: string;
  backgroundImage?: number;
  ctaButtons: CtaButton_NoRelations[];
}
