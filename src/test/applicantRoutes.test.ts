import request from 'supertest';
import server from '../server'; // Assuming your server instance is exported from 'server.ts'

// Tests for the 'awesome/applicant' endpoint
describe('Applicant API Tests', () => {
    let testId:number;
  it('should get information about the applicant', async () => {
    const response = await request(server).get('/api/awesome/applicant');
    expect(response.status).toBe(200); 
  });

  it('should add new information about the applicant', async () => {
    const data = { firstname: 'test', lastname: 'Test', email: 'test@email.com', number:'0123456789' };
    const response = await request(server).post('/api/awesome/applicant').send(data);
    testId=response.body.id;
    expect(response.status).toBe(201); 
  });

  it('should delete information about the applicant', async () => {
    const response = await request(server).delete('/api/awesome/applicant/2');
    expect(response.status).toBe(200);
  });

  
});
