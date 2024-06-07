-- mock 10000 users
DO
$$
DECLARE
    i INTEGER;
    first_names TEXT[] := ARRAY['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah'];
    last_names TEXT[] := ARRAY['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Davis'];
BEGIN
    FOR i IN 1..10000 LOOP
        INSERT INTO users (first_name, last_name, age, sex, problems)
        VALUES (
            first_names[FLOOR(RANDOM() * ARRAY_LENGTH(first_names, 1) + 1)],
            last_names[FLOOR(RANDOM() * ARRAY_LENGTH(last_names, 1) + 1)],
            FLOOR(RANDOM() * (80 - 18 + 1)) + 18,
            CAST(CASE WHEN RANDOM() < 0.5 THEN 'female' ELSE 'male' END AS sex),
            RANDOM() < 0.5
        );
    END LOOP;
END
$$;