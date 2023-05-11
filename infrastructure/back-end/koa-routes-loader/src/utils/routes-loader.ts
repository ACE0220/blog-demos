import path from "path";
import fs from "fs";
import Router, { IRouterOptions } from "koa-router";

class RoutesLoader {
  private options: IRouterOptions = {} as IRouterOptions;

  private static instance: RoutesLoader | null = null;

  /**
   * 1. singleton
   * @returns instance
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new RoutesLoader();
    }
    return this.instance;
  }

  /**
   * 2. The initial configuration is the same as the initial configuration of the koa-router
   * @param options
   * @returns root router
   */
  async init(options?: IRouterOptions) {
    if (options) {
      this.options = options;
    }
    const routeFiles = this.getFiles();
    // 3.3 return root route
    return await this.loadRoutesWrapper(routeFiles);
  }

  /**
   * typescript custom guard
   * Determine whether data is an instance of the Router
   * @param data
   * @returns
   */
  isRouter(data: any): data is Router {
    return data instanceof Router;
  }

  /**
   * generate a root router
   * @returns rootRouter
   */
  setRootRouter() {
    const rootRouer = new Router(this.options);
    return rootRouer;
  }

  /**
   * 3. get files from routes dir, return an array with file absolute path item
   * @returns an array with file absolute path item
   */
  getFiles() {
    // 3.1 Read all routing files recursively
    function _getFiles(dir: string, filepath: string): string[] {
      let retArr: string[] = [];
      const fullPath = path.resolve(dir, filepath);
      const files = fs.readdirSync(fullPath);
      for (const file of files) {
        const stat = fs.statSync(path.resolve(fullPath, file));
        if (stat.isDirectory()) {
          retArr = [...retArr, ..._getFiles(fullPath, file)];
        } else if (stat.isFile()) {
          retArr.push(path.resolve(fullPath, file));
        }
      }
      return retArr;
    }

    return _getFiles(process.cwd(), "src/routes");
  }

  /**
   * 3.2 handle all routes
   * @param allFullFilePath
   * @returns root router after handle all routes
   */
  async loadRoutesWrapper(allFullFilePath: string[]) {
    // get rootRouter
    const rootRouer = this.setRootRouter();

    for (const fullPath of allFullFilePath) {
      const module = await import(fullPath);
      if (this.isRouter(module.default)) {
        rootRouer.use(module.default.routes(), module.default.allowedMethods());
      }
    }
    return rootRouer;
  }
}

export default RoutesLoader.getInstance();
