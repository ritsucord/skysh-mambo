import { mockUser } from '../data/mockUser.js';

export function getCurrentUser() {
  return Promise.resolve(mockUser);
}
