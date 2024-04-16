import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../utils.js';
import Joi from 'joi';
describe('Blog endpoints', () => {
    let token;
    let blogId;
    const blogSchema = Joi.object({
        author: Joi.string().default("Robs_dagreat"),
        title: Joi.string().required(),
        story: Joi.string().required(),
        image: Joi.string().required()
    });
    const updateBlogSchema = Joi.object({
        author: Joi.string().optional(),
        title: Joi.string().optional(),
        story: Joi.string().optional(),
        image: Joi.string().optional()
    });
    before(() => {
        const payload = { email: 'admin@example.com', isAdmin: true };
        token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
    });
    it('should create a new blog', function (done) {
        this.timeout(15000);
        const requestBody = {
            author: 'Robs_dagreat',
            title: 'Test blog',
            story: 'This is a test blog',
            image: 'image url'
        };
        const { error } = blogSchema.validate(requestBody);
        if (error) {
            return done(error);
        }
        request(app)
            .post('/api/blog/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(requestBody)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Blog created successfully');
            blogId = res.body.blogId;
            done();
        });
    });
    it('should return a single blog by ID', function (done) {
        this.timeout(15000);
        request(app)
            .get(`/api/blog/${blogId}`)
            .set({ Authorization: `Bearer ${token}` })
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Blog was found!');
            done();
        });
    });
    it('should update a blog', (done) => {
        const updateBody = {
            author: 'Robs_dagreat',
            title: 'Test blog',
            story: 'This is a test blog',
            image: 'image url'
        };
        const { error } = updateBlogSchema.validate(updateBody);
        if (error) {
            return done(error);
        }
        request(app)
            .put(`/api/blog/edit/${blogId}`)
            .set({ Authorization: `Bearer ${token}` })
            .send(updateBody)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Blog updated');
            done();
        });
    });
    it('should delete a blog', function (done) {
        this.timeout(15000);
        request(app)
            .delete(`/api/blog/delete/${blogId}`)
            .set({ Authorization: `Bearer ${token}` })
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Blog deleted');
            done();
        });
    });
});
//# sourceMappingURL=blogs.test.js.map