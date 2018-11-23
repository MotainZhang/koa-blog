import {get, post} from './axios.js'
//登录
export const getBlogArticleList = p => get('/c/getArticleList', p);
//获取博客信息
export const getBlogInfo = p => get('/c/getBlogInfo', p);
// 获取所有分类和标签及其数量
export const getTagsAndCategories = p => get('/c/getTagsAndCategories', p);
// 根据分类搜索
export const searchByCategory = p => get('/c/searchByCategory', p);
// 根据标签搜索
export const searchByTag = p => get('/c/searchByTag', p);
// 获取文章的详细信息
export const getArticleDetail = p => get('/c/getArticleDetail', p);