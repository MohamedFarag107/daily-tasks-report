export type PaginationOption = {
  page: number;
  limit: number;
};
export function createPagination<T>(
  [docs, count]: [T[], number],
  { limit, page }: PaginationOption,
) {
  const totalPages = Math.ceil(count / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPrevPage ? page - 1 : null;

  return {
    docs,
    page,
    limit,
    totalDocs: count,
    totalPages,
    hasNextPage,
    nextPage,
    hasPrevPage,
    prevPage,
  };
}
