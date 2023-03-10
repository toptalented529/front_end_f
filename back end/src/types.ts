import { USERS_TOKENS } from './modules/users/contants';
import { COMMON_TOKENS } from './common/types';
import { AUTH_TOKENS } from './modules/auth/contants';
import { USERS_REFRESH_TOKENS } from './modules/users-refresh-tokens/contants';
import { UPLOAD_TOKENS } from './modules/upload/constants';

export const TOKENS = {
  ...USERS_TOKENS,
  ...COMMON_TOKENS,
  ...AUTH_TOKENS,
  ...USERS_REFRESH_TOKENS,
  ...UPLOAD_TOKENS,
};
