import axios from "axios";

test('Não deve aceitar um pedido com CPF inválido', async function() {
  const input = {
    cpf: '406.302.170-27'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.message).toBe('Invalid CPF');
});

test('Deve criar um pedido vazio', async function() {
  const input = {
    cpf: '407.302.170-27'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.total).toBe(0);
});

test('Deve criar um pedido com 3 produtos', async function() {
  const input = {
    cpf: '407.302.170-27',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ]
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test('Deve criar um pedido com 3 produtos com cupom de desconto', async function() {
  const input = {
    cpf: '407.302.170-27',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ],
    coupon: 'VALE20'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.total).toBe(4872);
});

test('Não deve criar um pedido com cupom de desconto expirado', async function() {
  const input = {
    cpf: '407.302.170-27',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ],
    coupon: 'VALE10'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.message).toBe('Invalid coupon');
});

test('Quantidade de um item não pode ser negativa', async function() {
  const input = {
    cpf: '407.302.170-27',
    items: [
      { idProduct: 1, quantity: -1 },
      { idProduct: 2, quantity: 1 }
    ],
    coupon: 'VALE20'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.message).toBe('Invalid quantity');
});

test('Item não pode ser repetido', async function() {
  const input = {
    cpf: '407.302.170-27',
    items: [
      { idProduct: 1, quantity: 10 },
      { idProduct: 1, quantity: 5 }
    ],
    coupon: 'VALE20'
  }
  const response = await axios.post('http://localhost:3000/checkout', input);
  const output = response.data;
  expect(output.message).toBe('Repeated item');
});