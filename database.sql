-- First delete the existing database
DROP DATABASE encode;

-- Then create a new database
CREATE DATABASE encode;

-- If you prefer to simply delete the tables instead of the whole database, user the code below:
DROP TABLE objectives;
DROP TABLE lessons;

-- Insert this code inside your better_change database
CREATE TABLE objectives(
  id SERIAL PRIMARY KEY,
  number INT,
  objective VARCHAR(1000) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  lesson_id INT
);

CREATE TABLE lessons(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  course_id INT
);


INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (1, 1, 'Learn to “think like a Software Engineer”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/learn-to-think-like-a-software-engineer/', 1);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (2, 2, 'Quiz: What does it mean to “think like a software engineer?”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/quiz-what-does-it-mean-to-think-like-a-software-engineer/', 1);
