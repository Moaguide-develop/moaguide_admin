import React, { useEffect, useState } from 'react';
import { ArticleContent } from '../types/article';
import { getArticleList } from '../api/article';
import ArticlePagination from './pagenation';

// 날짜 변환 함수 (YYYY-MM-DD)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// type (article -> 아티클, video -> 영상, all -> 전체)
const typeToName = (type: string) => {
  if (type === 'article') return '아티클';
  if (type === 'video') return '영상';
  return '전체';
};

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const type = 'all';
      const category = 'all';
      const response = await getArticleList(type, category, page);
      setArticles(response.content);
      setTotalPages(Math.ceil(response.total / size));
    };

    fetchArticles();
  }, [page, size]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="m-8 ml-14">
      <div className="text-2xl font-bold mb-4">북마크</div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500">찜한 콘텐츠 {articles.length}</div>
      </div>
      <div className="space-y-4">
        {articles.map((items) => (
          <div
            key={items.article.articleId}
            className="flex items-center bg-white p-4 shadow rounded-lg border border-gray-200"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
              <img
                src={items.article.img_link}
                alt={items.article.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-lg font-bold text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis max-xl:max-w-[200px]">
                {items.article.title}
              </div>
              <div className="text-gray-500">
                {typeToName(items.article.type)}
              </div>
              <div className="text-sm text-gray-400">
                {formatDate(items.article.date)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ArticlePagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
