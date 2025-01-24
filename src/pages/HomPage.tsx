import React from "react";

const HomePage: React.FC = () => {
  const bookmarks = [
    {
      id: 1,
      title: "오래된 아이템...",
      date: "2024-06-06",
      category: "가구 장식",
    },
    {
      id: 2,
      title: "또다른 오래된...",
      date: "2024-06-05",
      category: "가구 장식",
    },
  ];

  return (
    <div className="m-8 ml-14">
      <div className="text-2xl font-bold mb-4">북마크</div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500">찜한 콘텐츠 {bookmarks.length}</div>
      </div>
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center bg-white p-4 shadow rounded-lg border border-gray-200"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0"></div>
            <div className="ml-4 flex-1">
              <div className="text-lg font-bold text-gray-800">
                {bookmark.title}
              </div>
              <div className="text-gray-500">{bookmark.category}</div>
              <div className="text-sm text-gray-400">{bookmark.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
