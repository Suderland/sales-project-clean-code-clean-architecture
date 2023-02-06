import { validateCpf, isDateExpired } from "../src/validator"

test.each([
  '651.866.780-07',
  '341.731.430-52',
  '112.352.820-90'
])('Deve testar um CPF válido', function (cpf) {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeTruthy();
});

test.each([
  '123',
  '01234567891011121314'
])('Deve testar um CPF inválido', function (cpf) {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeFalsy();
});

test.each([
  '111.111.111-11',
  '222.222.222-22'
])('Deve testar um CPF inválido com todos os dígitos iguais', function (cpf) {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeFalsy();
});

test.each([
  new Date('2023-02-01')
])('A data está expirada', async function(expiredDate) {
  const isExpired = isDateExpired(expiredDate);
  expect(isExpired).toBeTruthy();
})