-- Create database and tables for vehicle handover system

CREATE DATABASE IF NOT EXISTS vehicle_handover_db;
USE vehicle_handover_db;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sessions table for cookie-based authentication
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Vehicle submissions table
CREATE TABLE vehicle_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    handover_date DATE NOT NULL,
    plate_no VARCHAR(50) NOT NULL,
    vehicle_type ENUM(
        'BACKHOE LOADER', 'BOOM TRUCK', 'BUS', 'COASTER', 'DIESEL TANKER',
        'DYNA IPV', 'DYNA TRUCK', 'FLAT BED TRAILER', 'FOOD TRUCK', 'FORKLIFT',
        'MINIBUS', 'POTABLE WT', 'SKID STEER LOADER', 'SUV', 'TOW TRUCK',
        'WATER TANKER', 'SEDAN', 'MOBILE CRANE', 'CHAIN EXCAVATOR',
        'WHEEL EXCAVATOR', 'WHEEL LOADER', 'TELEHANDLER', 'LOW BED TRAILER',
        'PICKUP', 'ROLLER COMPACTOR'
    ) NOT NULL,
    handover_by VARCHAR(255) NOT NULL,
    takeover_by VARCHAR(255) NOT NULL,
    id_no VARCHAR(50) NOT NULL,
    odo_meter_reading INT NOT NULL,
    registration_card ENUM('yes', 'no') NOT NULL,
    vehicle_authorization ENUM('complete', 'incomplete') NOT NULL,
    remarks TEXT,
    contact_no VARCHAR(20) NOT NULL,
    vehicle_pictures JSON,
    accessories_pictures JSON,
    handover_signature TEXT,
    takeover_signature TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT INTO users (email, name, role) VALUES 
('admin@etjahat.com', 'Administrator', 'admin'),
('user@etjahat.com', 'Test User', 'user');
