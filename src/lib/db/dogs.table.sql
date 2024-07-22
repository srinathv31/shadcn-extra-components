CREATE TABLE dogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age >= 0),
    weight DECIMAL(5, 2) CHECK (weight >= 0),
    breed VARCHAR(255),
    profile_picture TEXT,  -- URL to the profile picture
    energy_level VARCHAR(50) CHECK (energy_level IN ('Low', 'Medium', 'High')),
    owner_name VARCHAR(255),
    owner_contact VARCHAR(255),
    vaccination_status BOOLEAN DEFAULT FALSE,
    microchip_id VARCHAR(15),
    last_checkup_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DO
$$
DECLARE
    i INT := 1;
    breeds TEXT[] := ARRAY['Golden Retriever', 'Labrador', 'Beagle', 'Bulldog', 'Poodle', 'Boxer', 'Dachshund', 'Shih Tzu', 'Pomeranian', 'Chihuahua'];
    first_names TEXT[] := ARRAY['John', 'Steve', 'Kevin', 'LeBron', 'Steph', 'Joe', 'Jalen', 'Michael', 'David', 'Chris', 'Tom', 'Jerry'];
    last_names TEXT[] := ARRAY['Doe', 'Smith', 'James', 'Brown', 'Curry', 'Maxey', 'Rock', 'Johnson', 'Williams', 'Jones', 'Garcia', 'Miller'];
    dog_names TEXT[] := ARRAY['Buddy', 'Bella', 'Charlie', 'Max', 'Lucy', 'Daisy', 'Bailey', 'Luna', 'Rocky', 'Molly', 'Sadie', 'Cooper', 'Maggie'];
    first_name TEXT;
    last_name TEXT;
    dog_name TEXT;
    microchip_id TEXT;
BEGIN
    WHILE i <= 71 LOOP
        first_name := first_names[(FLOOR(RANDOM() * array_length(first_names, 1))) + 1];
        last_name := last_names[(FLOOR(RANDOM() * array_length(last_names, 1))) + 1];
        dog_name := dog_names[(FLOOR(RANDOM() * array_length(dog_names, 1))) + 1];
        microchip_id := LPAD((FLOOR(RANDOM() * 1000000000000000)::TEXT), 15, '0');
        
        INSERT INTO dogs (
            name, 
            age, 
            weight, 
            breed, 
            profile_picture, 
            energy_level, 
            owner_name, 
            owner_contact, 
            vaccination_status, 
            microchip_id, 
            last_checkup_date
        ) VALUES (
            dog_name, 
            (RANDOM() * 15)::INT, 
            ROUND((RANDOM() * 50 + 5)::NUMERIC, 2), 
            breeds[(i % 10) + 1], 
            'https://example.com/profile_pictures/dog_' || i || '.jpg', 
            CASE 
                WHEN i % 3 = 0 THEN 'Low'
                WHEN i % 3 = 1 THEN 'Medium'
                ELSE 'High'
            END, 
            first_name || ' ' || last_name, 
            LOWER(first_name) || '.' || LOWER(last_name) || '@example.com', 
            (i % 2)::BOOLEAN, 
            microchip_id, 
            NOW()::DATE - (FLOOR(RANDOM() * 365))::INT
        );
        i := i + 1;
    END LOOP;
END
$$;
