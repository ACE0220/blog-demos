import { Sequelize, Options, Dialect } from 'sequelize';

type IPublichSequelizeInitOptions = {
  database: string;
  username: string;
  password: string;
  options: Options & {
    host: string;
    port: number;
    dialect: Dialect;
  };
};

class DBUtil {
  private seq!: Sequelize;
  async auth() {
    try {
      await this.seq.authenticate();
      console.log('Connection success');
    } catch (error) {
      console.log('Unable to connect to the database:', error);
    }
  }

  instance(options?: IPublichSequelizeInitOptions) {
    if (!this.seq && options) {
      const { database, username, password, options: op } = options;
      try {
        this.seq = new Sequelize(database, username, password, op);
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
    return this.seq;
  }

  close() {
    this.seq.close();
  }
}

export const dbutil = new DBUtil().instance({
  database: 'seq-test',
  username: 'root',
  password: 'Aa123456',
  options: {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
});
