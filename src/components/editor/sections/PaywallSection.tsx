// PaywallSection.tsx

import React from 'react';
import { PaywallContent } from '../common/sectionProps/paywallSection';

interface PaywallSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: PaywallContent;
}

const PaywallSection: React.FC<PaywallSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
}) => {
  return (
    <div
      className="relative w-full max-w-2xl mx-auto p-6 bg-white rounded-lg"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      {/* Title and Description */}
      <div className="text-center mb-8">
        <strong className="block text-xl font-semibold text-gray-900">
          {content.title}
        </strong>
        <p className="text-sm text-gray-600 mt-2">{content.description}</p>
      </div>

      {/* Subscribe Button */}
      <div className="flex justify-center mb-6">
        <a
          href="#"
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base rounded-md shadow transition duration-200"
        >
          {content.subscribeText}
        </a>
      </div>

      {/* Info Text */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        {content.infoText}
      </div>
    </div>
  );
};

export default PaywallSection;
