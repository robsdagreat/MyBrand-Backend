import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Admin login', () => {
  before(() => {
    
    process.env.ADMIN = 'admin@example.com';
    process.env.ADMINPASS = 'password123';
  });

  after(() => {
    
    delete process.env.ADMIN;
    delete process.env.ADMINPASS;
  });

  it('should login an admin with valid credentials', (done) => {
    request(app)
      .post('/api/admin/login')
      .send({
        email: process.env.ADMIN,
        password: process.env.ADMINPASS,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Welcome back Admin!');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should return an error for login with invalid credentials', (done) => {
    request(app)
      .post('/api/admin/login')
      .send({
        email: 'invalid@example.com',
        password: 'invalidpassword',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Invalid credentials');
        done();
      });
  });

  it('should return an error when email or password is missing', (done) => {
    request(app)
      .post('/api/admin/login')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Email and password are required');
        done();
      });
  });
});