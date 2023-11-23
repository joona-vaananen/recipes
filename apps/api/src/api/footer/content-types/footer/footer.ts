// Interface automatically generated by schemas-to-ts

import { Media } from '../../../../common/interfaces/Media';
import { AdminPanelRelationPropertyModification } from '../../../../common/interfaces/AdminPanelRelationPropertyModification';

export interface Footer {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    logo: { data: Media };
    copyright: string;
    locale: string;
    localizations?: { data: Footer[] };
  };
}
export interface Footer_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  logo: Media;
  copyright: string;
  locale: string;
  localizations?: Footer[];
}

export interface Footer_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  logo: number;
  copyright: string;
  locale: string;
  localizations?: Footer[];
}

export interface Footer_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  logo: AdminPanelRelationPropertyModification<Media>;
  copyright: string;
  locale: string;
  localizations?: Footer[];
}
