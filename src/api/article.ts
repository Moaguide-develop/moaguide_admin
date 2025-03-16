import { AddArticleData } from '../types/article';
import { apiClient } from './axiosInstance';

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

export const uploadImage = async (imageUrl: string) => {
  try {
    const response = await apiClient.post(
      '/articles/image',
      new URLSearchParams({ src: imageUrl }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('api Error');
  }
};

export const getArticleList = async (
  type: string,
  category: string,
  page: number,
) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    const url = `/contents/list?type=${type}&category=${category}&page=${page}`;

    const { data } = await apiClient.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('API Error');
  }
};
