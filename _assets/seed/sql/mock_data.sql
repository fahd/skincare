\c skin;

-- Users
insert into users
	(first_name, last_name, username, avatar, password, email, city, bio)
values
	('Kanye', 'West', 'kanyewest', 'https://avatars.dicebear.com/api/male/kanyewest.svg', 's#F@je3r$f', 'kanyewest@goodmusic.com', 'Chicago', 'Kanye Omari West is an American rapper, record producer, and fashion designer. Throughout his career, West has been responsible for cultural movements and all around lunacy.');

insert into users
	(first_name, last_name, username, avatar, password, email, city, bio, reddit)
values
	('Sean', 'Carter', 'seancarter', 'https://avatars.dicebear.com/api/male/seancarter.svg', 's#F@je3r$f', 'seancarter@rocafella.com', 'Brooklyn', 'Shawn Corey Carter (born December 4, 1969), known professionally as Jay-Z (stylized as JAY-Z), is an American rapper, songwriter, record executive, businessman, and record producer', 'spez');

insert into users
	(first_name, last_name, username, avatar, password, email, city, bio, twitter)
values
	('Martha', 'Stewart','marthastewart',  'https://avatars.dicebear.com/api/female/marthastewart.svg', 's#F@je3r$f', 'mstewart@harverd.edu', 'Los Angeles', 'Martha Helen Stewart is an American retail businesswoman, writer, television personality, former model, and convicted felon. As founder of Martha Stewart Living Omnimedia, she gained success through a variety of business ventures, encompassing publishing, broadcasting, merchandising and e-commerce.', 'marthastewart');

insert into users
	(first_name, last_name, username, avatar, password, email, city, bio, instagram)
values
	('LeBron', 'James', 'lebronjames',  'https://avatars.dicebear.com/api/male/lebronjames.svg', 's#F@je3r$f', 'lebron@lakers.com', 'Los Angeles', 'LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association. Widely considered one of the greatest NBA players, James is frequently compared to Michael Jordan in debates over the greatest basketball player of all time.', 'kingjames');

insert into users
	(first_name, last_name, username, avatar, password, email, city, bio, instagram, twitter, facebook, reddit)
values
	('Mark', 'Zucc', 'marczucc',  'https://avatars.dicebear.com/api/male/markzucc.svg', '$2b$10$2XK6hAhvyW7buZDodQiPP.QyYTASlHQ9sWT7K4i78.4XSAkH1MUiu', 'asad@gmail.com', 'Los Angeles', 'In west Philadelphia born and raised, on the playground was where I spent most of my days. Chillin'' out maxin'' relaxin'' all cool, and all shootin some b-ball outside of the school. When a couple of guys who were up to no good - started making trouble in my neighborhood. I got in one little fight and my mom got scared. She said ''You''re movin'' with your auntie and uncle in Bel Air', 'zuck', 'mark', 'zuck', 'mark');

-- Lists

INSERT INTO lists 
(routine_title, slug, userid)
VALUES ('My Morning Routine', 'my-morning-routine', '5');

INSERT INTO lists 
(routine_title, slug, userid)
VALUES ('Afternoon Routine', 'afternoon-routine', '5');

INSERT INTO lists 
(routine_title, slug, userid)
VALUES ('My Masks', 'my-masks', '5');

INSERT INTO lists 
(routine_title, slug, userid)
VALUES ('Night Routine', 'night-routine', '5');

INSERT INTO lists 
(routine_title, slug, userid)
VALUES ('Moisturizing', 'moisturizing', '5');

-- ListProducts
INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Eye Treatment', 'My favorite. I''ve been on a quest to find an alternative to Skinceuticals'' vitamin C that''s budget friendly. This stuff not only fits the bill, but is significantly less expensive. My skin just glows. I also appreciate this vitamin C is in a pump bottle as opposed to Skinceutical''s dropper where the vitamin C can be compromised. I''m very happy and will continue to repurchase.', '1', '3');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Toning', 'I recently just got this witch hazel and it was the only one available, usually I get Dickinson''s but I thought I''d give this one a whirl since it had a such nice packaging, it was a bit more pricey but that''s alright because so far I''ve been using it everyday for about 2 months and my skin has been progressively better and clearer! I''ve tried two other witch hazels throughout the years and they have not given me the results like this one has. My hyperpigmentation from past acne is actually healing at a greater pace, which I am so so happy about, because it''s one of my biggest insecurities. I just had to make a review about it to spread the word for anyone that deals with acne prone skin and hyperpigmentation, because this stuff is the real deal and will save your skin❣️', '1', '2');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Cleansing', 'I put it all over my face in the morning. Let it soak dry for 15 minutes!', '1', '1');


INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Hydration', 'Yeet', '1', '4');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Tone', '', '2', '3');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Hydration', '', '2', '1');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Anti-Aging', '', '3', '4');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Facial Peels', '', '4', '2');

INSERT INTO listProducts (action, description, listId, productId) 
VALUES ('Cleansing', '', '5', '5');

-- Likes
insert into likes (userId, productId) values (1, 1);
insert into likes (userId, productId) values (2, 1);
insert into likes (userId, productId) values (3, 1);
insert into likes (userId, productId) values (4, 1);
insert into likes (userId, productId) values (1, 9);
insert into likes (userId, productId) values (2, 9);
insert into likes (userId, productId) values (3, 9);
insert into likes (userId, productId) values (4, 9);
insert into likes (userId, productId) values (1, 8);
insert into likes (userId, productId) values (4, 8);
insert into likes (userId, productId) values (2, 2);
insert into likes (userId, productId) values (4, 7);
insert into likes (userId, productId) values (1, 10501);
insert into likes (userId, productId) values (2, 10501);
insert into likes (userId, productId) values (3, 10501);
insert into likes (userId, productId) values (4, 10501);
insert into likes (userId, productId) values (5, 10501);

  -- List Likes
insert into listlikes (listId, userId) values (1, 1);   
insert into listlikes (listId, userId) values (1, 2);   
insert into listlikes (listId, userId) values (1, 3);   
insert into listlikes (listId, userId) values (1, 4);   
insert into listlikes (listId, userId) values (2, 1);
insert into listlikes (listId, userId) values (2, 3);
insert into listlikes (listId, userId) values (2, 5);
insert into listlikes (listId, userId) values (3, 4);

-- Comments
insert into comments
	(userId, productId, commentBody)
values
	(1, 1, 'I have really sensitive skin and I''ve tried EVERY moisturizer to find one that wouldn''t break me out. Even Cerave and Cetaphil both broke me out, but I knew I needed a moisturizer because I don''t want to start getting wrinkles/fine lines. I mix this with 4 drops of the rosehip oil every morning and I massage my face for about 3 minutes. It''s life changing!!! My skin tone is so even and it got rid of all of my most recent acne scars within days. For those of you who hate sleeping with thick masks or oil on (I can''t stand it), I wash my face and use my acne cream at night then use my ordinary duo after showering before putting my makeup on in the morning. I just let it soak into my skin while I do my hair to help. If you have breakout prone skin and need a moisturizer, this is worth a shot.');

insert into comments
	(userId, productId, commentBody)
values
	(1,1,'Last month I went to the beach and got a really bad sunburn on my face - when I came back I knew that I needed to change my skincare routine to help my damaged skin recover. This product was recommended to me and after using it I saw results within 2 days of incorporating it into my routine. I now use it every morning and night after washing my face and before my moisturizer. Highly recommend!');

insert into comments
	(userId, productId, commentBody)
values
	(2, 1, 'Good non oily serum . Absorbs quickly and I think pretty comparable with Lancome Genifique which I love but don''t love the price of!!');

insert into comments
	(userId, productId, commentBody)
values
	(4, 1, 'I''m a champion kek kek kek. Put sum RESPEAHKT On MUH NAME ');

insert into comments
	(userId, productId, commentBody)
values
	(3, 2, '3m pp with my second baby and I''ve had little Hormonal bumps all over my cheeks and forehead since she''s been born. For the last week I used AM and PM and have noticed a huge difference in my skin!');

-- Comment Like Id
insert into commentlikes
	(commentId, userId)
values
	(1, 1);

insert into commentlikes
	(commentId, userId)
values
	(3, 1);

insert into commentlikes
	(commentId, userId)
values
	(3, 2);
  
insert into commentlikes
	(commentId, userId)
values
	(3, 3);

insert into commentlikes
	(commentId, userId)
values
	(2, 2);

insert into commentlikes
	(commentId, userId)
values
	(2, 3);