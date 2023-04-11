'use strict';

const faker = require('@faker-js/faker');
const fake = faker.faker;

const projectCommentReplies = [...Array(10)].map(
	(projectCommentReply, index) => ({
		UserId: fake.mersenne.rand(2, 1),
		CommentId: fake.mersenne.rand(10, 1),
		body: fake.random.words(5),
		createdAt: new Date(),
		updatedAt: new Date(),
	})
);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'RepliesComments',
			projectCommentReplies,
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
