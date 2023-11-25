// Interface automatically generated by schemas-to-ts

export enum Name {
  Category = 'category',
  Course = 'course',
  Cuisine = 'cuisine',
  Diet = 'diet',
  MainIngredient = 'mainIngredient',
  MealType = 'mealType',
  Method = 'method',
  Season = 'season',}

export interface CheckboxFilter {
  label: string;
  name: Name;
}
export interface CheckboxFilter_Plain {
  label: string;
  name: Name;
}

export interface CheckboxFilter_NoRelations {
  label: string;
  name: Name;
}
