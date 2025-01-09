import { CommonSectionProps } from '../commonSection';

export interface PaywallContent {
  title: string;
  description: string;
  subscribeText: string;
  infoText: string;
}

export interface PaywallSection extends CommonSectionProps {
  type: 'paywall';
  content: PaywallContent;
}
