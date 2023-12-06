// Interface automatically generated by schemas-to-ts

import { AdminPanelRelationPropertyModification } from '../../../../common/interfaces/AdminPanelRelationPropertyModification';
import { Media } from '../../../../common/interfaces/Media';

export interface Header {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    logo: { data: Media };
    items?: any;
    locale: string;
    localizations?: { data: Header[] };
  };
}
export interface Header_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  logo: Media;
  items?: any;
  locale: string;
  localizations?: Header[];
}

export interface Header_NoRelations {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  logo: number;
  items?: any;
  locale: string;
  localizations?: Header[];
}

export interface Header_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  logo: AdminPanelRelationPropertyModification<Media>;
  items?: any;
  locale: string;
  localizations?: Header[];
}
