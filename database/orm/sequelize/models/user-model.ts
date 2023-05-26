import { Model } from 'sequelize';
import { dbutil } from '../src/db';
import { DataType } from 'sequelize-typescript';

export type IPublicUserType = Model<{
  username: string;
}>;

export const UserModel = dbutil.define<IPublicUserType>('User', {
  username: DataType.STRING,
});
