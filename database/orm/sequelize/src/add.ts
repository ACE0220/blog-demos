import { dbutil } from './db';
import { v4 as uuidv4 } from 'uuid';
import { UserModel, IPublicUserType } from '../models/user-model';
import { ProductModel, IPublicProductType } from '../models/product-model';

async function main() {
  // 先同步所有模型
  await dbutil.sync();
  // 一次添加一个用户
  await UserModel.create<IPublicUserType>({
    username: 'user' + uuidv4(),
  });
  // 一次添加多个商品
  await ProductModel.bulkCreate<IPublicProductType>([
    {
      product_name: 'product' + uuidv4(),
    },
    {
      product_name: 'product' + uuidv4(),
    },
    {
      product_name: 'product' + uuidv4(),
    },
  ]);
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
