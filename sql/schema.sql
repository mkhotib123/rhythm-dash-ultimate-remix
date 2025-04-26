-- PostgreSQL Schema for Rhythm Dash Ultimate Remix

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    password_hash TEXT,
    guest BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    difficulty VARCHAR(50),
    beatmap JSONB,
    audio_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    level_id INTEGER REFERENCES levels(id),
    score INTEGER,
    stars INTEGER,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE power_ups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    effect TEXT,
    icon_path TEXT,
    price INTEGER
);

CREATE TABLE user_powerups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    power_up_id INTEGER REFERENCES power_ups(id),
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    preview_path TEXT,
    price INTEGER
);

CREATE TABLE user_skins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    skin_id INTEGER REFERENCES skins(id),
    equipped BOOLEAN DEFAULT FALSE
);
