// Interface automatically generated by schemas-to-ts

import { Recipe } from '../../../recipe/content-types/recipe/recipe';
import { Icon } from '../../../icon/content-types/icon/icon';
import { Recipe_Plain } from '../../../recipe/content-types/recipe/recipe';
import { Icon_Plain } from '../../../icon/content-types/icon/icon';
import { AdminPanelRelationPropertyModification } from '../../../../common/interfaces/AdminPanelRelationPropertyModification';

export interface Season {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name: string;
    slug: string;
    recipes?: { data: Recipe[] };
    icon?: { data: Icon };
    locale: string;
    localizations?: { data: Season[] };
  };
}
export interface Season_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: Recipe_Plain[];
  icon?: Icon_Plain;
  locale: string;
  localizations?: Season[];
}

export interface Season_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: number[];
  icon?: number;
  locale: string;
  localizations?: Season[];
}

export interface Season_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: AdminPanelRelationPropertyModification<Recipe_Plain>;
  icon?: AdminPanelRelationPropertyModification<Icon_Plain>;
  locale: string;
  localizations?: Season[];
}
