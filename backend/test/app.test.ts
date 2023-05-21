import 'chai/register-should.js';

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from "../src/app.js";

teardown( () => app.close() );


// test('Listing all users from /dbTest', async () => {
// 	const response = await app.inject({
// 		method: 'GET',
// 		url: '/dbTest'
// 	});
//
// 	response.statusCode.should.equal(200);
// });
//
// test('Creating new user', async () => {
//
// 	const payload = {
// 		name: "Testname",
// 		email: faker.internet.email(),
// 		petType: "Dog"
// 	};
//
// 	const response = await app.inject({
// 		method: 'POST',
// 		url: '/users',
// 		payload
// 	});
//
// 	response.statusCode.should.equal(200);
// 	response.payload.should.not.equal(payload);
// 	const resPayload = response.json();
// 	resPayload.email.should.equal(payload.email);
// 	resPayload.petType.should.equal("Dog");
// });
test("Adding a user", async () =>{
	const payload = {
		email: "testemail8@gmail.com",
		username: "KoolKid4",
		password: "password"
	};
	const response = await app.inject({
		method: 'POST',
		url: '/users',
		payload
	});
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.email.should.equal(payload.email);
	resPayload.userName.should.equal(payload.username);
});

test("Delete a user", async () => {
	const payload = {
		username: "KoolKid4",
	};
	const response = await app.inject({
		method: 'DELETE',
		url: '/users',
		payload
	});

	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.username.should.equal(payload.username);
});
