import {expect} from 'chai'
import request  from 'supertest';
import app from '../app.js';
import Message from '../models/contact.js'; 


describe('Contact Form', () => {
    it('should send a message successfully with valid input', function(done){
    this.timeout(15000)
        request(app)
            .post('/api/v1/contact/queries')
            .send({name: 'John Doe', email: 'johndoe@example.com',message: 'This is a test message'})
            .expect(200)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Query sent successfully, Thank you!');
                done();
            });
    });

    it('should return a Server Error', function(done) {
        this.timeout(15000);
        const originalCreate = Message.create;
        Message.create = () => {
          throw new Error('Simulated server error');
        };
      
        request(app)
          .post('/api/v1/contact/queries')
          .send({ name: 'John Doe', email: 'johndoe@example.com', message: 'This is a test message' })
          .expect(500)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.have.property('message').equal('Server Error');
            Message.create = originalCreate; // Restore the original create function
            done();
          });
      });
});
     