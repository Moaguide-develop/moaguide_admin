import { apiClient } from './axiosInstance';

export const addFile = async (file: File): Promise<string> => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = ['application/pdf', 'image/jpeg', 'image/png'];

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('파일 크기가 5MB를 초과합니다.');
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    throw new Error('지원하지 않는 파일 형식입니다.');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/file/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (!response.data || typeof response.data !== 'string') {
      throw new Error('서버에서 유효한 파일 URL을 반환하지 않았습니다.');
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('서버 에러:', error.response.data);
      throw new Error(`서버 에러: ${error.response.data?.message}`);
    } else if (error.request) {
      console.error('응답 없음:', error.request);
      throw new Error('서버로부터 응답이 없습니다. 네트워크를 확인하세요.');
    } else {
      console.error('요청 설정 오류:', error.message);
      throw new Error(`요청 오류: ${error.message}`);
    }
  }
};
