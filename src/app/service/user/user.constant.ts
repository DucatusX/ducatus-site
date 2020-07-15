import { UserInterface } from './user.interface';

export const DEFAULT_USER = {
  username: '',
  contracts: 0,
  is_ghost: true,
  use_totp: false,
  id: 0,
  is_social: false,
  lang: 'en',
} as UserInterface;
