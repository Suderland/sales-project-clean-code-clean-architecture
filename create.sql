-- Active: 1646266180966@@127.0.0.1@5432@postgres
CREATE schema cccat10;

create table cccat10.product (
  id_product integer,
  description text,
  price numeric
);
INSERT INTO cccat10.product (id_product, description, price) values (1, 'A', 1000);
INSERT INTO cccat10.product (id_product, description, price) values (2, 'B', 5000);
INSERT INTO cccat10.product (id_product, description, price) values (3, 'C', 30);

SELECT * FROM cccat10.product;

DELETE FROM cccat10.product WHERE id_product = 1;

create table cccat10.coupon (
  code text,
  percentage numeric
);
INSERT INTO cccat10.coupon (code, percentage) values ('VALE20', 20);

INSERT INTO cccat10.coupon (code, percentage, valid_date) values ('VALE10', 10, '2023-01-10');

SELECT * FROM cccat10.coupon;

DROP TABLE cccat10.coupon;

ALTER TABLE cccat10.coupon ADD COLUMN valid_date DATE DEFAULT '2023-02-01';

UPDATE cccat10.coupon SET valid_date = '2023-01-01' WHERE code like 'VALE10';