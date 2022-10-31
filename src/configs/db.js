const env = process.env
// const fs = require('fs')
const db = {
    host: env.DB_HOST || '0.0.0.0',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'geerhro555',
    database: env.DB_NAME || 'prpo',
    port: env.DB_PORT || 3306,
    connectionLimit: 5
    // ssl: {
    //   mode: 'VERIFY_IDENTITY',
    //   ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
    // }
}

module.exports = db

/**

CREATE TABLE users (
    id int(255) NOT NULL UNIQUE AUTO_INCREMENT,
    password varchar(128),
    firstName varchar(255) DEFAULT '',
    larstName varchar(255) DEFAULT '',
    email varchar(255) UNIQUE DEFAULT '',
    createAt datetime(6) NOT NULL,
    updateAt datetime(6) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id int(255) NOT NULL UNIQUE AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    code varchar(255) NOT NULL,
    unit varchar(64) NOT NULL,
    price float(24) NOT NULL,
    createAt datetime(6) NOT NULL,
    updateAt datetime(6) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE purchase (
    id int(255) NOT NULL UNIQUE AUTO_INCREMENT,
    code varchar(255) NOT NULL UNIQUE,
    status varchar(10) DEFAULT '01',
    type varchar(10) DEFAULT '',
    sub_type varchar(10) DEFAULT '',
    note text DEFAULT '',
    opened datetime(6),
    opened_by int,
    checked datetime(6),
    checked_by int,
    approved datetime(6),
    approved_by int,
    assign datetime(6),
    assign_by int,
    buyer_get datetime(6),
    buyer_get_by int,
    buyer_set datetime(6),
    buyer_set_by int,
    examination datetime(6),
    examination_by int,
    po_approved datetime(6),
    po_approved_by int,
    po_ordered datetime(6),
    po_ordered_by int,
    received datetime(6),
    received_by int,
    closed datetime(6),
    closed_by int,
    createAt datetime(6),
    updateAt datetime(6),
    PRIMARY KEY (id),
    FOREIGN KEY (opened_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (checked_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assign_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (buyer_get_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (buyer_set_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (examination_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (po_approved_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (po_ordered_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (received_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (closed_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE purchase_item (
    id int(255) NOT NULL UNIQUE AUTO_INCREMENT,
    purchase_id int NOT NULL,
    no varchar(255) NOT NULL,
    description text,
    qty varchar(100),
    unit varchar(20),
    price float(24) NOT NULL,
    amount int NOT NULL,
    required varchar(100),
    supplier varchar(100),
    asset_no varchar(100),
    createAt datetime(6),
    updateAt datetime(6),
    PRIMARY KEY (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id) ON DELETE CASCADE
);

CREATE TABLE project (
    id int(255) NOT NULL UNIQUE AUTO_INCREMENT,
    code varchar(255) NOT NULL UNIQUE,
    name int NOT NULL,
    startAt datetime(6),
    endAt datetime(6),
    createAt datetime(6),
    updateAt datetime(6),
    PRIMARY KEY (id),
);

 */