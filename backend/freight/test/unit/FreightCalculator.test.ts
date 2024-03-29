import FreightCalculator from "../../src/domain/entity/FreightCalculator";

test('Deve calcular o frete do produto de um item com qtd 1', function() {
  const freight = FreightCalculator.calculate(1000, 100, 30, 10, 3);
  expect(freight).toBe(30);
});

test('Deve calcular o frete do produto com qtd 3', function() {
  const freight = FreightCalculator.calculate(1000, 100, 30, 10, 3, 3);
  expect(freight).toBe(90);
});

test('Deve calcular o frete do produto com preço mínimo', function() {
  const freight = FreightCalculator.calculate(1000, 10, 10, 10, 0.9);
  expect(freight).toBe(10);
});