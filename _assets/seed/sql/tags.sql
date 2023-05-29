\c de2v2q6flvih27;

-- Tags
insert into tags (tagType, isAction) values ('Skin Care',true);
insert into tags (tagType, isAction) values ('Lotions & Creams',true);
insert into tags (tagType, isAction) values ('Anti Aging',true);
insert into tags (tagType, isAction) values ('Face',true);
insert into tags (tagType, isAction) values ('Bath & Body',true);
insert into tags (tagType, isAction) values ('Hair',true);
insert into tags (tagType, isAction) values ('Masks',true);
insert into tags (tagType, isAction) values ('Makeup',true);
insert into tags (tagType, isAction) values ('Eye Makeup',true);
insert into tags (tagType, isAction) values ('Eye Treatment',true);
insert into tags (tagType, isAction) values ('Lips',true);
insert into tags (tagType, isAction) values ('Nails',true);
insert into tags (tagType, isAction) values ('Fragrance',true);
insert into tags (tagType, isAction) values ('Hydration',true);
insert into tags (tagType, isAction) values ('Serum',true);
insert into tags (tagType, isAction) values ('Shaving',true);
insert into tags (tagType, isAction) values ('Shower',true);
insert into tags (tagType, isAction) values ('Suncare',true);
insert into tags (tagType, isAction) values ('Oral Care',true);
insert into tags (tagType, isAction) values ('Men',false);
insert into tags (tagType, isAction) values ('Supplement',true);
insert into tags (tagType, isAction) values ('Accessories',false);

---------------------------------------
-- NestedTags

-- Skin Care
insert into nestedTags (tagId, tagType) values (1, 'Lip Care');
insert into nestedTags (tagId, tagType) values (1, 'Facial Rollers');
insert into nestedTags (tagId, tagType) values (1, 'Face Wash');
insert into nestedTags (tagId, tagType) values (1, 'Moisturizer');
insert into nestedTags (tagId, tagType) values (1, 'Night Cream');
insert into nestedTags (tagId, tagType) values (1, 'Cleanser');
insert into nestedTags (tagId, tagType) values (1, 'Exfoliator');
insert into nestedTags (tagId, tagType) values (1, 'Acne & Blemish');
insert into nestedTags (tagId, tagType) values (1, 'Dry Skin');
insert into nestedTags (tagId, tagType) values (1, 'Combination Skin');
insert into nestedTags (tagId, tagType) values (1, 'Oily Skin');
insert into nestedTags (tagId, tagType) values (1, 'Korean Skin Care');
insert into nestedTags (tagId, tagType) values (1, 'Toner');

-- Face
insert into nestedTags (tagId, tagType) values (4, 'Facial Peels');
insert into nestedTags (tagId, tagType) values (4, 'Face Mist');
insert into nestedTags (tagId, tagType) values (4, 'Face Oil');
insert into nestedTags (tagId, tagType) values (4, 'Face Masks');
insert into nestedTags (tagId, tagType) values (4, 'Facial Spray');

-- Bath & Body
insert into nestedTags (tagId, tagType) values (5, 'Body Scrubs & Exfoliants');
insert into nestedTags (tagId, tagType) values (5, 'Body Lotions & Creams');
insert into nestedTags (tagId, tagType) values (5, 'Hand & Foot Care');
insert into nestedTags (tagId, tagType) values (5, 'Manicure & Pedicure');
insert into nestedTags (tagId, tagType) values (5, 'Deodorant');
insert into nestedTags (tagId, tagType) values (5, 'Nails');
insert into nestedTags (tagId, tagType) values (5, 'Aromatherapy');

-- Hair
insert into nestedTags (tagId, tagType) values (6, 'Hair Removal');
insert into nestedTags (tagId, tagType) values (6, 'Hair Loss');
insert into nestedTags (tagId, tagType) values (6, 'Hair Treatment');
insert into nestedTags (tagId, tagType) values (6, 'Hair Color');
insert into nestedTags (tagId, tagType) values (6, 'Styling');

-- Makeup
insert into nestedTags (tagId, tagType) values (8, 'Foundation');
insert into nestedTags (tagId, tagType) values (8, 'Bronzer');
insert into nestedTags (tagId, tagType) values (8, 'Concealer');
insert into nestedTags (tagId, tagType) values (8, 'Blush');
insert into nestedTags (tagId, tagType) values (8, 'Contouring');
insert into nestedTags (tagId, tagType) values (8, 'Face Powder');
insert into nestedTags (tagId, tagType) values (8, 'Face Primer');
insert into nestedTags (tagId, tagType) values (8, 'Highlighter');
insert into nestedTags (tagId, tagType) values (8, 'Makeup Remover');

-- Eye Makeup
insert into nestedTags (tagId, tagType) values (9, 'Eyebrows');
insert into nestedTags (tagId, tagType) values (9, 'Eyelashes');
insert into nestedTags (tagId, tagType) values (9, 'Eyeliner');
insert into nestedTags (tagId, tagType) values (9, 'Eyeshadow');
insert into nestedTags (tagId, tagType) values (9, 'Mascara');

-- Eye Treatment
insert into nestedTags (tagId, tagType) values (10, 'Eye Masks');
insert into nestedTags (tagId, tagType) values (10, 'Retinol');
insert into nestedTags (tagId, tagType) values (10, 'Eye Serums');

-- Lips
insert into nestedTags (tagId, tagType) values (11, 'Lip Gloss');
insert into nestedTags (tagId, tagType) values (11, 'Lip Care');
insert into nestedTags (tagId, tagType) values (11, 'Lipstick');

-- Nails
insert into nestedTags (tagId, tagType) values (12, 'Removers');
insert into nestedTags (tagId, tagType) values (12, 'Nail Treatment');
insert into nestedTags (tagId, tagType) values (12, 'Nail Polish');
insert into nestedTags (tagId, tagType) values (12, 'Top & Base Coats');

-- Fragrance
insert into nestedTags (tagId, tagType) values (13, 'Men''s Fragrance');
insert into nestedTags (tagId, tagType) values (13, 'Women''s Fragrance');
insert into nestedTags (tagId, tagType) values (13, 'Cologne');
insert into nestedTags (tagId, tagType) values (13, 'Perfume');

-- Serums
insert into nestedTags (tagId, tagType) values (15, 'Eye Serums');

-- Shower
insert into nestedTags (tagId, tagType) values (17, 'Shampoo & Conditioner');
insert into nestedTags (tagId, tagType) values (17, 'Shower Gel & Body Wash');

-- Suncare
insert into nestedTags (tagId, tagType) values (18, 'Self-Tanning');
insert into nestedTags (tagId, tagType) values (18, 'Sunscreen');

-- Men
insert into nestedTags (tagId, tagType) values (20, 'Beard');
insert into nestedTags (tagId, tagType) values (20, 'Men''s Shaving');
insert into nestedTags (tagId, tagType) values (20, 'Men''s Hair Styling');

-- Accessories
insert into nestedTags (tagId, tagType) values (22, 'Tools & Brushes');
insert into nestedTags (tagId, tagType) values (22, 'Makeup Accessories');

-- Extra
insert into nestedTags (tagId, tagType) values (4, 'Face Serum');