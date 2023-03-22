import Verify from "../../src/application/usecase/Verify";

test('Deve verificar um token', async () => {
  const verify = new Verify();
	const payload = await verify.execute('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGVyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA');
	expect(payload.email).toBe('suder@gmail.com');
});