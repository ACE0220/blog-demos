interface DbConfig {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConf {
  dev: DbConfig,
  prod: DbConfig
}

class DbConf {
  static conf: DbConf = new DbConf();
  env!: keyof EnvConf
  envConig!: EnvConf
  constructor() {
    this.env = process.env.NODE_ENV as keyof EnvConf || 'prod';
    this.initConf();
  }

  initConf() {
    this.envConig = {
      dev: {
        host: 'localhost',
        user: 'root',
        password: 'kel1031',
        database: 'mall',
        port: 3306
      },
      prod: {
        host: 'localhost',
        user: 'root',
        password: 'kel1031',
        database: 'mall',
        port: 3306
      }
    }
  }

  getConf(): DbConfig;
  getConf(key: string):string;
  getConf(key: any=''): any {
    if(this.isKeyofDbConf(key) && key.length > 0) {
      return this.envConig[this.env][key]
    }
    return this.envConig[this.env]
  }

  isKeyofDbConf(key: any): key is keyof DbConfig {
    return key === 'host' || key === 'user' || key === 'password' || key === 'port' || key === 'database'
  }
}

export const dbConfig = DbConf.conf;