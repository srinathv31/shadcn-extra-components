CREATE TABLE car_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INTEGER CHECK (year BETWEEN 1990 AND 2025), -- Car years range from 1990 to 2025
    color VARCHAR(50),
    mileage DECIMAL(10, 2) CHECK (mileage >= 0),
    vin VARCHAR(17) UNIQUE NOT NULL, -- VIN is typically 17 characters long
    owner_name VARCHAR(255),
    owner_contact VARCHAR(255),
    last_service_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DO
$$
DECLARE
    i INT := 1;
    makes TEXT[] := ARRAY['Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Kia', 'Mercedes-Benz', 'Nissan', 'Toyota', 'Volkswagen'];
    models TEXT[] := ARRAY['3 Series', 'A4', 'Altima', 'C-Class', 'Camaro', 'Civic', 'Corolla', 'Golf', 'Mustang', 'Optima'];
    colors TEXT[] := ARRAY['Black', 'Blue', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'Silver', 'White', 'Yellow'];
    first_names TEXT[] := ARRAY['John', 'Steve', 'Kevin', 'LeBron', 'Steph', 'Joe', 'Jalen', 'Michael', 'David', 'Chris', 'Tom', 'Jerry'];
    last_names TEXT[] := ARRAY['Doe', 'Smith', 'James', 'Brown', 'Curry', 'Maxey', 'Rock', 'Johnson', 'Williams', 'Jones', 'Garcia', 'Miller'];
    make TEXT;
    model TEXT;
    color TEXT;
    first_name TEXT;
    last_name TEXT;
    vin TEXT;
BEGIN
    WHILE i <= 400 LOOP
        make := makes[(FLOOR(RANDOM() * array_length(makes, 1))) + 1];
        model := models[(FLOOR(RANDOM() * array_length(models, 1))) + 1];
        color := colors[(FLOOR(RANDOM() * array_length(colors, 1))) + 1];
        first_name := first_names[(FLOOR(RANDOM() * array_length(first_names, 1))) + 1];
        last_name := last_names[(FLOOR(RANDOM() * array_length(last_names, 1))) + 1];
        vin := LPAD((FLOOR(RANDOM() * 10000000000000000)::TEXT), 17, '0');
        
        INSERT INTO car_owners (
            make, 
            model, 
            year, 
            color, 
            mileage, 
            vin, 
            owner_name, 
            owner_contact, 
            last_service_date
        ) VALUES (
            make, 
            model, 
            (FLOOR(RANDOM() * 36) + 1990)::INT, -- Cars from year 1990 to 2025
            color, 
            ROUND((RANDOM() * 300000)::NUMERIC, 2), 
            vin, 
            first_name || ' ' || last_name, 
            LOWER(first_name) || '.' || LOWER(last_name) || '@example.com', 
            NOW()::DATE - (FLOOR(RANDOM() * 365))::INT
        );
        i := i + 1;
    END LOOP;
END
$$;
