// Interface automatically generated by schemas-to-ts

export interface RecipeSearchPage {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    filters: any;
    locale: string;
    localizations?: { data: RecipeSearchPage[] };
  };
}
export interface RecipeSearchPage_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  filters: any;
  locale: string;
  localizations?: RecipeSearchPage[];
}

export interface RecipeSearchPage_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  filters: any;
  locale: string;
  localizations?: RecipeSearchPage[];
}

export interface RecipeSearchPage_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  filters: any;
  locale: string;
  localizations?: RecipeSearchPage[];
}