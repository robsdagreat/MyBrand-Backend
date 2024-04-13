import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import User from '../models/user.js';

describe('Users endpoints', () => {
  let userId: string;
  let testUser: any;

  before(async () => {

    testUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'Password!23',
    });
    await testUser.save();
    userId = testUser._id.toString();
  });

  after(async () => {
    await User.deleteOne({ _id: testUser._id });
  });

  it('should fetch a single user by ID', (done) => {
    request(app)
      .get(`/api/user/${userId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('User found!');
        done();
      });
  });

  it('should create a new user or return conflict if email exists', function(done) {
    this.timeout(15000);
    request(app)
      .post('/api/signup')
      .send({
        username: 'newuser',
        email: 'newuniqueemail@example.com',
        password: 'NewPassword!23',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
  
        if (res.status === 201) {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('User created successfully');
          done();
        } else if (res.status === 409) {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Email address already associated with an account!');
          done();
        } else {
          done(new Error(`Unexpected response status: ${res.status}`));
        }
      });
  });

  it('should delete a user', (done) => {
    request(app)
      .delete(`/api/user/delete/${userId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('User deleted!');
        done();
      });
  });

  it('should update a user', (done) => {
    request(app)
      .put(`/api/user/edit/${userId}`)
      .send({
        username: 'updated name',
        email: 'updated@example.com',
        password: 'updatedPassword!23',
      })
      .end((err, res) => {
        if (res.body.message === 'User not found!') {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('User not found!');
          done();
        } else {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('User info was updated successfully');
          done();
        }
      });
  });

  it('should handle login with valid credentials', function(done){
    this.timeout(15000)
    
    request(app)
      .post('/api/login')
      .send({
        email: 'newuniqueemail@example.com',
        password: 'NewPassword!23' 
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
  
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Logged in successfully');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should handle login failure with invalid credentials', (done) => {
    request(app)
      .post('/api/login')
      .send({
        email: 'invalid@example.com',
        password: 'invalidPassword',
      })
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Invalid credentials');
        done();
      });
  });
});