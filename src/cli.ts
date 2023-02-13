import pgp from "pg-promise";
import { validateCpf } from "./validator";

const input: Input = { cpf:'', items:[] }
process.stdin.on('data', async function (chunck) {
  const command = chunck.toString().replace(/\n/g, '');
  if (command.startsWith('set-cpf')){
    input.cpf = command.replace('set-cpf ', '');
  }
  if (command.startsWith('add-item')){
    const [idProduct, quantity] = command.replace('add-item ', '').split(' ');
    input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
  }
  if (command.startsWith('checkout')){
    const connection = pgp()('postgres://postgres:admin@localhost:5432/postgres');
    try {
      const isValidCpf = validateCpf(input.cpf);
      if (!isValidCpf) throw new Error('Invalid CPF');  
      const output: Output = {
        total: 0,
        freight: 0
      };
      if (input.items){
        const itemsIds = new Set<number>();
        for (const item of input.items) {
          if (item.quantity < 0) throw new Error('Invalid quantity');
          if (itemsIds.has(item.idProduct)) throw new Error('Repeated item');
          itemsIds.add(item.idProduct);  
          const [productData] = await connection.query('select * from cccat10.product where id_product = $1', item.idProduct);
          if (productData.width <= 0 || productData.height <= 0 || productData.length <= 0 || parseFloat(productData.weight) <= 0) throw new Error('Invalid dimension')
          output.total += parseFloat(productData.price) * item.quantity;
          const volume = productData.width/100 * productData.height/100 * productData.length/100;
          const density = parseFloat(productData.weight)/volume;
          const itemFreight = 1000 * volume * (density/100);
          output.freight += Math.max(itemFreight, 10) * item.quantity;
        }
      }  
      if (input.coupon) {
        const [couponData] = await connection.query('select * from cccat10.coupon where code = $1', [input.coupon]);
        if (couponData.expire_date.getTime() >= new Date().getTime()) {
          const percentage = parseFloat(couponData.percentage);
          output.total -= (output.total * percentage)/100;
        }    
      }
      if (input.from && input.to) {
        output.total += output.freight;
      }
      console.log(output);    
    } catch (e: any) {
      console.log(e.message);
    } finally {
      await connection.$pool.end();
    }
  }
  console.log(input);
});

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