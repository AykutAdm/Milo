export type AccountInfo = {
  accountInfoId: string;
  platformId: string;
  platformName?: string;
  email?: string;
  username?: string;
  description?: string;
};

export type GetPassword = {
  result: string;
};
