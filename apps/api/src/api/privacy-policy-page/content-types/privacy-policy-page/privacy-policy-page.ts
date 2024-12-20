// Interface automatically generated by schemas-to-ts

import { Metadata } from '../../../../components/page/interfaces/Metadata';
import { Metadata_Plain } from '../../../../components/page/interfaces/Metadata';
import { Metadata_NoRelations } from '../../../../components/page/interfaces/Metadata';

export interface PrivacyPolicyPage {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title?: string;
    content?: any;
    metadata?: Metadata;
    locale: string;
    localizations?: { data: PrivacyPolicyPage[] };
  };
}
export interface PrivacyPolicyPage_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title?: string;
  content?: any;
  metadata?: Metadata_Plain;
  locale: string;
  localizations?: PrivacyPolicyPage[];
}

export interface PrivacyPolicyPage_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title?: string;
  content?: any;
  metadata?: Metadata_NoRelations;
  locale: string;
  localizations?: PrivacyPolicyPage[];
}

export interface PrivacyPolicyPage_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title?: string;
  content?: any;
  metadata?: Metadata_Plain;
  locale: string;
  localizations?: PrivacyPolicyPage[];
}
