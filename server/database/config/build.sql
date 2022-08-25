BEGIN;

DROP TABLE IF EXISTS tasks, dates CASCADE;

CREATE TABLE dates(
  id SERIAL PRIMARY KEY,
  task_date VARCHAR(100) NOT NULL
);

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  task VARCHAR(200) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT(FALSE),
  date_id INTEGER REFERENCES dates(id)
);

INSERT INTO dates(task_date) VALUES 
('2022-12-01'),
('2021-10-04'),
('2022-06-07');

INSERT INTO tasks(task, date_id) VALUES 
('take my clothes to dry clean', '1'),
('buy caramella food', '2'),
('kill Basil and steal all his money', '3'),
('have a barbeque party on planet Mars', '1'),
('You can consider this to be a task', '3');

COMMIT;