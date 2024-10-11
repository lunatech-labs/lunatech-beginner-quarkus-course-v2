ALTER SEQUENCE Product_SEQ INCREMENT BY 1;
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Chair', 'A metal frame chair, with oak seat', 59.95);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Dinner Table', 'Sturdy oak Table', 200);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Coffee Table', 'An oak coffee Table', 120);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Side Table', 'A Nice little oak side table', 80);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Mirror', 'A round mirror with oak frame', 80);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Lamp', 'A light that shines', 45);
INSERT into Product (id, name, description, price) VALUES (nextval('Product_SEQ'), 'Carpet', 'Soft carpet', 39.95);