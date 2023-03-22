import Checkout from "../../application/usecase/Checkout";
import GetProducts from "../../application/usecase/GetProducts";
import Usecase from "../../application/usecase/Usecase";
import HttpServer from "./HttpServer";

export default class HttpController {

  constructor (
    readonly httpServer: HttpServer, 
    readonly checkout: Usecase, //Checkout,
    readonly getProducts: Usecase //GetProducts
    ) {
    
    httpServer.on('post', '/checkout', async function (params:any, body:any) {
      const output = checkout.execute(body);
      return output;
    });

    httpServer.on('get', '/products', async function (params:any, body:any) {
      const output = await getProducts.execute();
      return output;
    })

  }
}