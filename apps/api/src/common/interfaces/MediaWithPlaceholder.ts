import { Media } from './Media';

export interface MediaWithPlaceholder extends Media {
  data: {
    attributes: {
      placeholder: string;
    };
  };
}
