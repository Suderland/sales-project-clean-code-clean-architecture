import TokenGenerator from "../../src/domain/entity/TokenGenerator";
import User from "../../src/domain/entity/User";

test('Deve gerar o token do usuário', async () => {
  const user = await User.create('suder@gmail.com', 'abc123');
  const expiresIn = 1000000;
	const issueDate = new Date("2023-03-01T10:00:00");
	const tokenGenerator = new TokenGenerator('key');
	const token = tokenGenerator.generate(user, expiresIn, issueDate);
	expect(token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGVyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA');
});

test('Deve validar o token do usuário', async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGVyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA';
  const tokenGenerator = new TokenGenerator('key');
	const payload = tokenGenerator.verify(token);
  expect(payload).toBeDefined();
  expect(payload.email).toBe('suder@gmail.com');
});

test('Token é inválido', async () => {
  const token = 'eyJhbG9.eyJlbWFpbCI6InN1ZGVmlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA';
  const tokenGenerator = new TokenGenerator('key');
	expect(() => tokenGenerator.verify(token)).toThrow(new Error('invalid token'));
});