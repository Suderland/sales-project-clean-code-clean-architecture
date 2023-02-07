import express, { Request, Response } from "express";
import { validateCpf, isDateExpired } from "./validator";
import pgp from "pg-promise";

const app = express();
app.use(express.json());

app.post('/checkout', async function (req: Request, res: Response) {
  const output: Output = {
    total: 0
  };
  const connection = pgp()('postgres://postgres:admin@localhost:5432/postgres');
  if (req.body.items){
    const itemsIds = new Set<number>();
    for (const item of req.body.items) {
      if (item.quantity < 0) output.message = 'Invalid quantity';

      if (itemsIds.has(item.idProduct)) output.message = 'Repeated item';
      itemsIds.add(item.idProduct);

      const [productData] = await connection.query('select * from cccat10.product where id_product = $1', item.idProduct);
      output.total += parseFloat(productData.price) * item.quantity;
    }
  }  
  if (req.body.coupon) {
    const [couponData] = await connection.query('select * from cccat10.coupon where code = $1', [req.body.coupon]);

    if (isDateExpired(couponData.valid_date)) output.message = 'Invalid coupon';

    const percentage = parseFloat(couponData.percentage);
    output.total -= (output.total * percentage)/100;
  }
  const isValidCpf = validateCpf(req.body.cpf);
  if (!isValidCpf) output.message = 'Invalid CPF';

  await connection.$pool.end();
  res.json(output);
})

type Output = {
  total: number,
  message?: string
}

app.listen('3000');