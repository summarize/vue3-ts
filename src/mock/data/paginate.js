import qs from "qs";
import _ from "lodash";

export const paginate = {
  current_page: 1,
  first_page_url: null,
  from: 1,
  last_page: 7,
  last_page_url: null,
  next_page_url: null,
  path: null,
  per_page: 15,
  prev_page_url: null,
  to: 15,
  total: 100,
};

export const getPaginate = (body, url, total = 100) => {
  /* let params = {};
  const i = url.indexOf("?");
  if (i !== -1) {
    params = qs.parse(url.substring(i + 1));
  } */
  let params = JSON.parse(body);
  // 必须有page 跟 limit参数
  if (
    !params.hasOwnProperty('page') &&
    !params.hasOwnProperty('limit')
  ) {
    return null;
  }

  const p = _.clone(paginate);
  const page = params.page
    ? params.page
    : p.current_page;
  const limit = params.limit
    ? params.limit
    : p.per_page;

  p.total = total;
  p.per_page = limit;
  p.last_page = Math.ceil(p.total / p.per_page);
  p.current_page = page > p.last_page ? p.last_page : page;
  p.from = (p.current_page - 1) * p.per_page + 1;
  p.to = p.current_page === p.last_page ? p.total : p.current_page * p.per_page;

  // p.path = url.substring(0, i);
  p.path = url;
  params.page = 1;
  p.first_page_url = p.path + "?" + qs.stringify(params);
  params.page = p.last_page;
  p.last_page_url = p.path + "?" + qs.stringify(params);
  params.page = p.current_page < p.last_page ? p.current_page + 1 : null;
  p.next_page_url = params.page ? p.path + "?" + qs.stringify(params) : null;
  params.page = p.current_page > 1 ? p.current_page - 1 : null;
  p.prev_page_url = params.page ? p.path + "?" + qs.stringify(params) : null;

  return p;
};