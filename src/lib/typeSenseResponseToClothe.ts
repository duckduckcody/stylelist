import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { Clothe, clotheSchema } from '../types/Clothe';

export const typeSenseResponseToClothe = (
  typeSenseResponse: SearchResponse<{}> | undefined
) => {
  const clothes: Clothe[] = [];

  typeSenseResponse?.hits?.forEach((clothe) => {
    const clotheParse = clotheSchema.safeParse(clothe.document);
    if (clotheParse.success) {
      clothes.push(clotheParse.data);
    } else {
      console.error(
        'Bad clothe data received in typeSenseResponseToClothe',
        clotheParse.error
      );
    }
  });

  return clothes;
};
