export type Subscription = {
  userSubscriptionId: string;
  platformId: string;
  platformName: string;
  platformIconUrl: string;
  categoryName: string;
  price: number;
  period: string;
  renewalDate: string;
  subscriptionStatus: number;
};

export type UpcomingRenewal = {
  userSubscriptionId: string;
  platformName: string;
  platformIconUrl: string;
  price: number;
  renewalDate: string;
};
