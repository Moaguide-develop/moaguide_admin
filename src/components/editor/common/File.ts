export interface FileAttributes {
  src: string;
  title: string;
}

export const createFileNodeHTML = (attrs: FileAttributes): HTMLElement => {
  const fileWrapper = document.createElement('div');
  fileWrapper.className =
    'flex items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm bg-white max-w-md';

  // 왼쪽 아이콘과 파일 제목
  const leftDiv = document.createElement('div');
  leftDiv.className = 'flex items-center space-x-2';

  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
    </svg>
  `;
  leftDiv.innerHTML = iconSvg;

  const fileTitle = document.createElement('span');
  fileTitle.className = 'text-sm font-medium text-gray-800 truncate';
  fileTitle.textContent = attrs.title || 'No title';

  leftDiv.appendChild(fileTitle);

  // 오른쪽 다운로드 아이콘
  const rightSpan = document.createElement('span');
  rightSpan.className =
    'flex items-center justify-center w-8 h-8 text-blue-600 rounded-full transition';

  const downloadLink = document.createElement('a');
  downloadLink.href = `http://43.200.90.72/file/download/${attrs.src}`;
  downloadLink.target = '_blank';
  downloadLink.rel = 'noopener noreferrer';

  const downloadSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
    </svg>
  `;
  downloadLink.innerHTML = downloadSvg;

  rightSpan.appendChild(downloadLink);

  // 전체 구조 결합
  fileWrapper.appendChild(leftDiv);
  fileWrapper.appendChild(rightSpan);

  return fileWrapper;
};
