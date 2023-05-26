import { dbutil } from '../src/db';
import { DataType, Model } from 'sequelize-typescript';

export type IPublicProductType = Model<{
  product_name: string;
}>;

export const ProductModel = dbutil.define<IPublicProductType>('Product', {
  product_name: DataType.STRING,
});
