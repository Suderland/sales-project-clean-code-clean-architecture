import Cpf from "../src/domain/entity/Cpf";

test.each([
  '651.866.780-07',
  '341.731.430-52',
  '112.352.820-90'
])('Deve testar um CPF válido', function (value) {
  const cpf = new Cpf(value);
  expect(cpf.value).toBeDefined();
});

test.each([
  '123',
  '01234567891011121314'
])('Deve testar um CPF inválido', function (value) {
  expect(() => new Cpf(value)).toThrow(new Error('Invalid CPF'));
});

test.each([
  '111.111.111-11',
  '222.222.222-22'
])('Deve testar um CPF inválido com todos os dígitos iguais', function (value) {
  expect(() => new Cpf(value)).toThrow(new Error('Invalid CPF'));
});
