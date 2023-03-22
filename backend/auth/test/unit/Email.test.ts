import Email from "../../src/domain/entity/Email";

test('Deve criar um e-mail válido', () => {
  const email = new Email('suder@gmail.com');
  expect(email.getValue()).toBe('suder@gmail.com');
});

test('Deve criar um e-mail inválido', () => {
  expect(() => new Email('suder@gmail')).toThrow(new Error('Invalid email'));
});