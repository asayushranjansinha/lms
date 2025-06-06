import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import { apiFetch } from '@/lib/api';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };


  const { data } = await apiFetch<Product[]>(`/course/search`);
  // const data = await fakeProducts.getProducts(filters);
  // const totalProducts = data.total_products;
  // const products: Product[] = data.products;

  console.log("Query", {...filters});
  return (
    <ProductTable
      data={ []}
      totalItems={20}
      columns={columns}
    />
  );
}
