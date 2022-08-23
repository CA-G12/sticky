BEGIN;

DROP TABLE IF EXISTS tasks, dates CASCADE;

CREATE TABLE dates(
  id SERIAL PRIMARY KEY,
  task_date DATE NOT NULL
);

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  task VARCHAR(200) NOT NULL,
  state VARCHAR(100) NOT NULL DEFAULT('available'),
  date_id INTEGER REFERENCES dates(id)
);

INSERT INTO dates(task_date) VALUES 
('01-12-2022'),
('04-10-2021'),
('07-06-2022');

INSERT INTO tasks(task, date_id) VALUES 
('Lorem ipsum dolor sit', '1'),
('Lorem ipsum', '2'),
('Lorem ipsumd basil sara', '3'),
('Lorem ipsumd basil sara shams mostafa', '1'),
('Lorem ipsumd basil sara shams mostafa omar', '3');

COMMIT;