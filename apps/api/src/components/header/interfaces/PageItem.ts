// Interface automatically generated by schemas-to-ts

import { Page } from '../../../api/page/content-types/page/page';
import { Page_Plain } from '../../../api/page/content-types/page/page';

export interface PageItem {
  label: string;
  page?: { data: Page };
}
export interface PageItem_Plain {
  label: string;
  page?: Page_Plain;
}

export interface PageItem_NoRelations {
  label: string;
  page?: number;
}

