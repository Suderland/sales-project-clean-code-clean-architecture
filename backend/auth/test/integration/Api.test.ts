import axios from 'axios';

axios.defaults.validateStatus = function () {
	return true;
}

test('Deve validar o fluxo de autenticação', async function () {
	const input = {
		email: 'suder@gmail.com',
		password: 'abc123',
		date: new Date('2023-03-01T10:00:00')
	};
	await axios.post('http://localhost:3004/signup', input);
	const response = await axios.post('http://localhost:3004/login', input);
	const output = response.data;
	expect(output.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGVyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA');
	const response2 = await axios.post('http://localhost:3004/verify', { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGVyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.kM7Bq9horY4Is_J_BKrlW8NVuHTBaFVphvmoRAGLhkA' });
	const output2 = response2.data;
	// console.log(output2);
	expect(output2.email).toBe('suder@gmail.com');
});