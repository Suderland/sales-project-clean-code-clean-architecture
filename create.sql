-- Active: 1646266180966@@127.0.0.1@5432@postgres
-- drop schema cccat10;
-- drop table cccat10.product; 
-- drop table cccat10.coupon;
CREATE schema cccat10;

--drop table cccat10.product;
create table cccat10.product (
	id_product integer,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric,
	currency text
);

INSERT INTO cccat10.product (id_product, description, price, width, height, length, weight, currency) 
values (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
INSERT INTO cccat10.product (id_product, description, price, width, height, length, weight, currency) 
values (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
INSERT INTO cccat10.product (id_product, description, price, width, height, length, weight, currency) 
values (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
INSERT INTO cccat10.product (id_product, description, price, width, height, length, weight, currency) 
values (4, 'D', 30, -10, 10, 10, 0.9, 'BRL');
INSERT INTO cccat10.product (id_product, description, price, width, height, length, weight, currency) 
values (5, 'E', 1000, 100, 30, 10, 3, 'USD');

SELECT * FROM cccat10.product;

DELETE FROM cccat10.product WHERE id_product = 1;

create table cccat10.coupon (
  code text,
  percentage numeric,
  expire_coupon timestamp
);
INSERT INTO cccat10.coupon (code, percentage, expire_coupon) values ('VALE20', 20, '2023-10-01T10:00:00');

INSERT INTO cccat10.coupon (code, percentage, expire_coupon) values ('VALE10', 10, '2022-10-01T10:00:00');

SELECT * FROM cccat10.coupon;

--DROP TABLE cccat10.coupon;

--ALTER TABLE cccat10.coupon ADD COLUMN valid_date DATE DEFAULT '2023-02-01';

--UPDATE cccat10.coupon SET valid_date = '2023-01-01' WHERE code like 'VALE10';