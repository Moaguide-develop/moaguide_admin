import { JSONContent } from '@tiptap/core';
import { apiClient } from './axiosInstance';

interface AddArticleData {
  title: string;
  authorName: string;
  categoryName: string;
  type: string;
  isPremium: boolean;
  imageLink: string;
  paywallUp: JSONContent[];
  paywallDown: JSONContent[];
}

export const saveArticle = async (articleData: AddArticleData) => {
  console.log('articleData:', articleData);
  console.log('articleData-paywallUp:', articleData.paywallUp);
  console.log('articleData-paywallDown:', articleData.paywallDown);
  try {
    const { data } = await apiClient.post('/articles', articleData);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('api Error');
  }
};
