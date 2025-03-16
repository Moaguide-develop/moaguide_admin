export interface AddArticleData {
  title: string;
  authorName: string;
  categoryName: string;
  type: string;
  isPremium: boolean;
  imageLink: string;
  paywallUp: string;
  paywallDown: string;
}

export interface Article {
  articleId: number;
  title: string;
  date: string;
  type: string;
  img_link?: string;
}

export interface ArticleContent {
  likedByMe: boolean;
  article: Article;
}

export interface ListArticleData {
  total: number;
  size: number;
  page: number;
  content: ArticleContent[];
}
