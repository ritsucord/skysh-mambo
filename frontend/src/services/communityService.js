import { mockCommunityPosts } from '../data/mockCommunity.js';

export function getCommunityPosts() {
  return Promise.resolve(mockCommunityPosts);
}
