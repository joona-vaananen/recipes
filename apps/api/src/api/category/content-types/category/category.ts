// Interface automatically generated by schemas-to-ts

import { Recipe } from '../../../recipe/content-types/recipe/recipe';
import { Icon } from '../../../icon/content-types/icon/icon';
import { Recipe_Plain } from '../../../recipe/content-types/recipe/recipe';
import { Icon_Plain } from '../../../icon/content-types/icon/icon';
import { AdminPanelRelationPropertyModification } from '../../../../common/interfaces/AdminPanelRelationPropertyModification';

export interface Category {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name: string;
    slug: string;
    recipes?: { data: Recipe[] };
    icon?: { data: Icon };
    locale: string;
    localizations?: { data: Category[] };
  };
}
export interface Category_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: Recipe_Plain[];
  icon?: Icon_Plain;
  locale: string;
  localizations?: Category[];
}

export interface Category_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: number[];
  icon?: number;
  locale: string;
  localizations?: Category[];
}

export interface Category_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name: string;
  slug: string;
  recipes?: AdminPanelRelationPropertyModification<Recipe_Plain>;
  icon?: AdminPanelRelationPropertyModification<Icon_Plain>;
  locale: string;
  localizations?: Category[];
}