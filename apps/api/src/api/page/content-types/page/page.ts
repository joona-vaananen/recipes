// Interface automatically generated by schemas-to-ts

import { Metadata } from '../../../../components/page/interfaces/Metadata';
import { Metadata_Plain } from '../../../../components/page/interfaces/Metadata';
import { Metadata_NoRelations } from '../../../../components/page/interfaces/Metadata';

export interface Page {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    slug: string;
    content?: any;
    metadata?: Metadata;
    locale: string;
    localizations?: { data: Page[] };
  };
}
export interface Page_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  content?: any;
  metadata?: Metadata_Plain;
  locale: string;
  localizations?: Page[];
}

export interface Page_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  content?: any;
  metadata?: Metadata_NoRelations;
  locale: string;
  localizations?: Page[];
}

export interface Page_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  content?: any;
  metadata?: Metadata_Plain;
  locale: string;
  localizations?: Page[];
}
