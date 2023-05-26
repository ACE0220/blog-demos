import { UserModel, IPublicUserType } from '../models/user-model';
import { ProductModel, IPublicProductType } from '../models/product-model';
import { dbutil } from './db';

async function main() {
  const users = await UserModel.findAll<IPublicUserType>();
  const products = await ProductModel.findAll<IPublicProductType>();

  console.log(users.map((item) => item.dataValues));
  console.log(products.map((item) => item.dataValues));
}

main()
  .then(async () => {
    dbutil.close();
  })
  .catch(async (e) => {
    console.error(e);
    dbutil.close();
    process.exit(1);
  });
