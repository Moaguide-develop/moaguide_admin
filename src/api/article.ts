import { apiClient } from './axiosInstance';

interface AddArticleData {
  title: string;
  authorName: string;
  categoryName: string;
  type: string;
  isPremium: boolean;
  imageLink: string;
  paywallUp: string;
  paywallDown: string;
}

export const saveArticle = async (articleData: AddArticleData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    const { data } = await apiClient.post('/articles', articleData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('api Error');
  }
};
