const filterSearch = ({ router, category, sort, search, price, size }) => {
  const path = router.pathname;
  const query = router.query;

  if (category) query.category = category;
  if (search) query.search = search;
  if (sort) query.sort = sort;
  if (price) query.price = price;
  if (size) query.size = size;
  router.push({
    pathname: path,
    query: query,
  });
};

export default filterSearch;
