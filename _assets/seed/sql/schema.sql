-- DROP DATABASE IF EXISTS skin;
-- CREATE DATABASE skin;

-- Make sure we're using our test database
\c de2v2q6flvih27;

CREATE TABLE IF NOT EXISTS brands (
	brandId SERIAL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	slug VARCHAR (50) NOT NULL,
	brandImg VARCHAR(150),
	brand_url VARCHAR(300)
);


CREATE TABLE IF NOT EXISTS products (
	productId SERIAL PRIMARY KEY,
	productImg VARCHAR(250) NOT NULL,
	title VARCHAR(250) NOT NULL,
	product_url VARCHAR(300) NOT NULL,
	product_desc TEXT,
	price VARCHAR(100),
	brandId BIGINT REFERENCES brands(brandId)
);


CREATE TABLE IF NOT EXISTS users (
	userId SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	avatar VARCHAR(75) NOT NULL,
	password VARCHAR(75) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	username VARCHAR(50) NOT NULL UNIQUE,
	instagram VARCHAR(100),
	twitter VARCHAR(100),
	facebook VARCHAR(100),
	reddit VARCHAR(100),
	city VARCHAR(50),
	bio TEXT
);

CREATE TABLE IF NOT EXISTS comments (
	commentId SERIAL PRIMARY KEY,
	commentBody TEXT,
	userId BIGINT REFERENCES users(userId),
	productId BIGINT REFERENCES products(productId)	
);


CREATE TABLE IF NOT EXISTS tags (
	tagId SERIAL PRIMARY KEY,
	tagType VARCHAR(50) NOT NULL,
	isAction BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS nestedTags (
	nestedTagId SERIAL PRIMARY KEY,
	tagType VARCHAR(50) NOT NULL,
	tagId BIGINT REFERENCES tags(tagId)
);

CREATE TABLE IF NOT EXISTS productNestedTags (
	productNestedTagId SERIAL PRIMARY KEY,
	productId BIGINT REFERENCES products(productId),	
	nestedTagId BIGINT REFERENCES nestedTags(nestedTagId)
);

CREATE TABLE IF NOT EXISTS productTags (
	productTagId SERIAL PRIMARY KEY,
	productId BIGINT REFERENCES products(productId),	
	tagId BIGINT REFERENCES tags(tagId)
);


CREATE TABLE IF NOT EXISTS lists (
	listId SERIAL PRIMARY KEY,
	routine_title VARCHAR(35) NOT NULL,
	slug VARCHAR(35) NOT NULL,
	userId BIGINT REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS listProducts (
	listProductId SERIAL PRIMARY KEY,
	action VARCHAR(50) NOT NULL,
	description TEXT,
	listId BIGINT REFERENCES lists(listId),
	productId BIGINT REFERENCES products(productId)
);

CREATE TABLE IF NOT EXISTS likes (
	likeId SERIAL PRIMARY KEY,
	userId BIGINT REFERENCES users(userId),
	productId BIGINT REFERENCES products(productId)
);

CREATE TABLE IF NOT EXISTS commentlikes (
	commentLikeId SERIAL PRIMARY KEY,
	commentId BIGINT REFERENCES comments(commentId),
	userId BIGINT REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS listlikes (
	listLikeId SERIAL PRIMARY KEY,
	listid BIGINT REFERENCES lists(listId),
	userId BIGINT REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS feedback (
	feedbackId SERIAL PRIMARY KEY,
	suggestion TEXT
);