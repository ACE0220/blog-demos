import { dbConfig } from "../conf/dbconfig";
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine();
  sequelize!:Sequelize;
  constructor() {
    this.initSeqConfig('mysql');
  }
  initSeqConfig(dialect: Dialect) {
    let {host, user, database, port, password} = dbConfig.getConf();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define: { timestamps: false, freezeTableName: true }
    })
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm;