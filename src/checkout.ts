import CouponRepository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import CurrencyGateway from "./CurrencyGateway";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import FreightCalculator from "./FreightCalculator";
import ProductRepository from "./ProductRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import { validateCpf } from "./validator";

export default class Checkout {

  constructor (
    readonly currencyGateway: CurrencyGateway = new CurrencyGatewayHttp(), 
    readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase()
    ) {
  }
  
  async execute(input: Input): Promise<Output> {
    const isValidCpf = validateCpf(input.cpf);
    if (!isValidCpf) throw new Error('Invalid CPF');  
    const output: Output = {
      total: 0,
      freight: 0
    };
    // const currencyGateway = new CurrencyGatewayHttp();
    const currencies = await this.currencyGateway.getCurrencies();
    if (input.items){
      const itemsIds = new Set<number>();
      for (const item of input.items) {
        if (item.quantity < 0) throw new Error('Invalid quantity');
        if (itemsIds.has(item.idProduct)) throw new Error('Repeated item');
        itemsIds.add(item.idProduct);  
        // const ProductRepository = new ProductRepositoryDatabase();
        const productData = await this.productRepository.getProduct(item.idProduct);
        if (productData.width <= 0 || productData.height <= 0 || productData.length <= 0 || parseFloat(productData.weight) <= 0) throw new Error('Invalid dimension')
        if (productData.currency === 'USD') {
          output.total += parseFloat(productData.price) * item.quantity * currencies.usd;
        } else {
          output.total += parseFloat(productData.price) * item.quantity;          
        }
        // const volume = productData.width/100 * productData.height/100 * productData.length/100;
        // const density = parseFloat(productData.weight)/volume;
        // const itemFreight = 1000 * volume * (density/100);
        const itemFreight = FreightCalculator.calculate(productData);
        output.freight += Math.max(itemFreight, 10) * item.quantity;
      }
    }  
    if (input.coupon) {
      // const couponRepository = new CouponRepositoryDatabase();
      const couponData = await this.couponRepository.getCoupon(input.coupon);
      if (couponData.expire_date.getTime() >= new Date().getTime()) {
        const percentage = parseFloat(couponData.percentage);
        output.total -= (output.total * percentage)/100;
      }    
    }
    if (input.from && input.to) {
      output.total += output.freight;
    }
    return output;    
  }
}

type Input = {
  cpf: string,
  items: { idProduct: number, quantity: number}[]
  coupon?: string,
  from?: string,
  to?: string
}

type Output = {
  total: number,
  freight: number
}