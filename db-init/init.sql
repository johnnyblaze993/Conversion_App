CREATE TABLE IF NOT EXISTS digimon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    digimon_number INT NOT NULL
);

-- Create the units table
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    unit_name TEXT NOT NULL UNIQUE
);

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the search_history table
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ingredient TEXT NOT NULL,
    original_measurement NUMERIC NOT NULL,
    original_unit_id INTEGER NOT NULL,
    converted_measurement NUMERIC NOT NULL,
    converted_unit_id INTEGER NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (original_unit_id) REFERENCES units(id) ON DELETE CASCADE,
    FOREIGN KEY (converted_unit_id) REFERENCES units(id) ON DELETE CASCADE
);

CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_original_unit_id ON search_history(original_unit_id);
CREATE INDEX idx_search_history_converted_unit_id ON search_history(converted_unit_id);

-- Create the conversion_lists table
CREATE TABLE conversion_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_conversion_lists_user_id ON conversion_lists(user_id);

-- Create the conversions table
CREATE TABLE conversions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ingredient TEXT NOT NULL,
    original_measurement NUMERIC NOT NULL,
    original_unit_id INTEGER NOT NULL,
    converted_measurement NUMERIC NOT NULL,
    converted_unit_id INTEGER NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    list_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (list_id) REFERENCES conversion_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (original_unit_id) REFERENCES units(id) ON DELETE CASCADE,
    FOREIGN KEY (converted_unit_id) REFERENCES units(id) ON DELETE CASCADE
);

CREATE INDEX idx_conversions_user_id ON conversions(user_id);
CREATE INDEX idx_conversions_list_id ON conversions(list_id);
CREATE INDEX idx_conversions_original_unit_id ON conversions(original_unit_id);
CREATE INDEX idx_conversions_converted_unit_id ON conversions(converted_unit_id);

-- Create the user_preferences table
CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY,
    preferred_measurement TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the list_comments table
CREATE TABLE list_comments (
    id SERIAL PRIMARY KEY,
    list_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES conversion_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_list_comments_list_id ON list_comments(list_id);
CREATE INDEX idx_list_comments_user_id ON list_comments(user_id);

-- Create the user_activity_log table (optional)
CREATE TABLE user_activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    activity TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_activity_log_user_id ON user_activity_log(user_id);

-- INSERT DATA INTO TABLES

-- Insert data into units table
INSERT INTO units (unit_name) VALUES 
('cup'), ('tablespoon'), ('teaspoon'), 
('gram'), ('kilogram'), ('milliliter'), 
('liter'), ('ounce'), ('pound'), 
('pinch'), ('quart'), ('gallon');

-- Insert data into users table
INSERT INTO users (username, email, password_hash) VALUES 
('AshKetchum', 'ash@pokemon.com', 'hashed_password_1'),
('Misty', 'misty@pokemon.com', 'hashed_password_2'),
('Brock', 'brock@pokemon.com', 'hashed_password_3'),
('GaryOak', 'gary@pokemon.com', 'hashed_password_4');

-- Insert data into search_history table
INSERT INTO search_history (user_id, ingredient, original_measurement, original_unit_id, converted_measurement, converted_unit_id) VALUES 
(1, 'Rare Candy', 5, 1, 118.3, 6), -- Ash searches for converting cups to milliliters
(2, 'Berry Juice', 1, 2, 3, 3),    -- Misty searches for converting tablespoons to teaspoons
(3, 'Pokéblock', 200, 4, 0.2, 5),  -- Brock searches for converting grams to kilograms
(4, 'Potion', 16, 8, 1, 9);        -- Gary searches for converting ounces to pounds

-- Insert data into conversion_lists table
INSERT INTO conversion_lists (user_id, name, favorite) VALUES 
(1, 'Ash\'s Favorite Ingredients', TRUE),
(2, 'Misty\'s Potions', FALSE),
(3, 'Brock\'s Recipes', TRUE),
(4, 'Gary\'s Training Supplies', FALSE);

-- Insert data into conversions table
INSERT INTO conversions (user_id, ingredient, original_measurement, original_unit_id, converted_measurement, converted_unit_id, list_id) VALUES 
(1, 'Poké Puffs', 2, 1, 473.2, 6, 1),   -- Ash's list includes converting cups to milliliters
(2, 'Super Potion', 5, 7, 5000, 6, 2),  -- Misty's list includes converting liters to milliliters
(3, 'Lava Cookie', 100, 4, 3.5, 8, 3),  -- Brock's list includes converting grams to ounces
(4, 'Hyper Potion', 32, 8, 2, 9, 4);    -- Gary's list includes converting ounces to pounds

-- Insert data into user_preferences table
INSERT INTO user_preferences (user_id, preferred_measurement) VALUES 
(1, 'milliliters'),
(2, 'teaspoons'),
(3, 'grams'),
(4, 'pounds');

-- Insert data into list_comments table
INSERT INTO list_comments (list_id, user_id, comment) VALUES 
(1, 2, 'Great list for battle snacks!'), -- Misty comments on Ash's list
(2, 1, 'Interesting potions!'),          -- Ash comments on Misty's list
(3, 4, 'Perfect for training meals!'),   -- Gary comments on Brock's list
(4, 3, 'Useful for training!');          -- Brock comments on Gary's list

-- Insert data into user_activity_log table (optional)
INSERT INTO user_activity_log (user_id, activity) VALUES 
(1, 'User logged in'),
(2, 'Added new conversion list'),
(3, 'Favorited a conversion list'),
(4, 'Commented on a list');

-- Insert data into digimon table
INSERT INTO digimon (name, type, digimon_number)
VALUES 
('Agumon', 'Reptile', 1),
('Gabumon', 'Animal', 2),
('Piyomon', 'Bird', 3);