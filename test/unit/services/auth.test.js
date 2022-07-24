const request = require('supertest');
const useRouter = require('../../../routes/userRouter');
const app = require('../../../server');

app.use(useRouter);
describe(
	'POST /user',
	function() {
		it('bad post /user', async () => {
			const res = await request(app).post('/user').send({});
			expect(res.statusCode).toBe(400);
		});

		it('good post /user', async () => {
			const res = await request(app).post('/user').send({
				firsname: 'abdou',
				lastname: 'sfayhi',
				email: 'abdousfayhitest@gmail.com',
				password: '123456789',
				birthDate: '2000-01-01',
				phoneNumber: '987321'
			});

			expect(res.statusCode).toBeTruthy();
		});
	},
	10000
);
