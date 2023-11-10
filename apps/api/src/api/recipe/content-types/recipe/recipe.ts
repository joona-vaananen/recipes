// Interface automatically generated by schemas-to-ts

import { AdminPanelRelationPropertyModification } from '../../../../common/interfaces/AdminPanelRelationPropertyModification';
import { Media } from '../../../../common/interfaces/Media';
import {
  Category,
  Category_Plain,
} from '../../../category/content-types/category/category';
import {
  Course,
  Course_Plain,
} from '../../../course/content-types/course/course';
import {
  Cuisine,
  Cuisine_Plain,
} from '../../../cuisine/content-types/cuisine/cuisine';
import { Diet, Diet_Plain } from '../../../diet/content-types/diet/diet';
import {
  MainIngredient,
  MainIngredient_Plain,
} from '../../../main-ingredient/content-types/main-ingredient/main-ingredient';
import {
  MealType,
  MealType_Plain,
} from '../../../meal-type/content-types/meal-type/meal-type';
import {
  Method,
  Method_Plain,
} from '../../../method/content-types/method/method';
import {
  Season,
  Season_Plain,
} from '../../../season/content-types/season/season';

export interface Recipe {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title: string;
    slug: string;
    image?: { data: Media };
    description?: string;
    categories?: { data: Category[] };
    mealTypes?: { data: MealType[] };
    courses?: { data: Course[] };
    diets?: { data: Diet[] };
    seasons?: { data: Season[] };
    methods?: { data: Method[] };
    mainIngredients?: { data: MainIngredient[] };
    cuisines?: { data: Cuisine[] };
    locale: string;
    localizations?: { data: Recipe[] };
    content: any;
    ingredients: any;
    servings: number;
    instructions: any;
    comments: any;
  };
}
export interface Recipe_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  slug: string;
  image?: Media;
  description?: string;
  categories?: Category_Plain[];
  mealTypes?: MealType_Plain[];
  courses?: Course_Plain[];
  diets?: Diet_Plain[];
  seasons?: Season_Plain[];
  methods?: Method_Plain[];
  mainIngredients?: MainIngredient_Plain[];
  cuisines?: Cuisine_Plain[];
  locale: string;
  localizations?: Recipe[];
  content: any;
  ingredients: any;
  servings: number;
  instructions: any;
  comments: any;
}

export interface Recipe_NoRelations {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  slug: string;
  image?: number;
  description?: string;
  categories?: number[];
  mealTypes?: number[];
  courses?: number[];
  diets?: number[];
  seasons?: number[];
  methods?: number[];
  mainIngredients?: number[];
  cuisines?: number[];
  locale: string;
  localizations?: Recipe[];
  content: any;
  ingredients: any;
  servings: number;
  instructions: any;
  comments: any;
}

export interface Recipe_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  slug: string;
  image?: AdminPanelRelationPropertyModification<Media>;
  description?: string;
  categories?: AdminPanelRelationPropertyModification<Category_Plain>;
  mealTypes?: AdminPanelRelationPropertyModification<MealType_Plain>;
  courses?: AdminPanelRelationPropertyModification<Course_Plain>;
  diets?: AdminPanelRelationPropertyModification<Diet_Plain>;
  seasons?: AdminPanelRelationPropertyModification<Season_Plain>;
  methods?: AdminPanelRelationPropertyModification<Method_Plain>;
  mainIngredients?: AdminPanelRelationPropertyModification<MainIngredient_Plain>;
  cuisines?: AdminPanelRelationPropertyModification<Cuisine_Plain>;
  locale: string;
  localizations?: Recipe[];
  content: any;
  ingredients: any;
  servings: number;
  instructions: any;
  comments: any;
}
