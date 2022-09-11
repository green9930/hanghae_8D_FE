import { tokenInstance } from "api/axios";

export const getDetailCheck = (articlesId) =>
  tokenInstance.get(`/api/auth/detail/${articlesId}`);

export const deleteDetailCheck = (payload) =>
  tokenInstance.delete(`/api/auth/detail/${payload}`);

export const postComment = (payload) =>
  tokenInstance.post(`/api/auth/detail/comments`, payload);

export const getComments = (payload) =>
  tokenInstance.get(`/api/auth/detail/comments/${payload}`);

export const selectComment = ({ articlesId, commentsId }) =>
  tokenInstance.patch(`/api/auth/detail/comments/${articlesId}`, {
    commentsId: commentsId,
  });

export const deleteComment = (payload) =>
  tokenInstance.delete(`/api/auth/detail/comments/${payload}`);
