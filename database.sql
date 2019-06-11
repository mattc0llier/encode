-- First delete the existing database
DROP DATABASE encode;

-- Then create a new database
CREATE DATABASE encode;

-- If you prefer to simply delete the tables instead of the whole database, user the code below:
DROP TABLE objectives;
DROP TABLE lessons;
DROP TABLE courses;
DROP TABLE organizations;
DROP TABLE users;
DROP TABLE activities;

-- Insert this code inside your better_change database
CREATE TABLE organizations(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  photo VARCHAR(500) NOT NULL UNIQUE,
  username VARCHAR(200) NOT NULL UNIQUE,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  tel VARCHAR(30) NOT NULL UNIQUE,
  bio VARCHAR(500) NOT NULL,
  location VARCHAR(500),
  creation_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE courses(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  organization_id INT,
  FOREIGN KEY (organization_id) REFERENCES organizations (id)
);

CREATE TABLE lessons(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE objectives(
  id SERIAL PRIMARY KEY,
  number INT,
  objective VARCHAR(1000) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  lesson_id INT,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
);

CREATE TABLE activities(
  id SERIAL PRIMARY KEY,
  objectives_id INT,
  user_id INT,
  complete BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (objectives_id) REFERENCES objectives (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (1, 'Matt', 'Collier', '/static/assets/images/Roland.jpg', 'matt@encode.app', 'matt', 'password', '01234567890', 'University drop out, Founder of Encode', 'Devon, UK', '2018-10-21T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (2, 'Roland', 'Levy', '/static/assets/images/Rolandd.jpg', 'test@gmail.com', 'roland', 'password', '01234567899', 'Constructor Labs alumni, Bhuddist guru', 'London, UK', '2018-10-22T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (3, 'Dmitri', 'Grabov', '/static/assets/images/Rolanddd.jpg', 'testing@gmail.com', 'dmitri', 'password', '01234567898', 'Constructor Labs founder', 'London, UK', '2018-10-23T10:37:33.735972Z');

INSERT INTO organizations
  (id, name, url)
  VALUES
  (1, 'Lambda School', 'https://lambdaschool.com');


INSERT INTO courses
  (id, name, url, organization_id)
  VALUES
  (1, 'Web Development Precourse', 'https://apply.lambdaschool.com/courses/web-precourse/', 1);


INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (1, 'Introduction to Web Development Fundamentals', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (2, 'Introduction to HTML', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-html-2/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (3, 'Introduction to CSS', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (4, 'Introduction to Javascript', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/', 1);


INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (1, 1, 'Learn to “think like a Software Engineer”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/learn-to-think-like-a-software-engineer/', 1);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (2, 2, 'Quiz: What does it mean to “think like a software engineer?”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/quiz-what-does-it-mean-to-think-like-a-software-engineer/', 1);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (3, 3, 'Learn how web development fits into the Greater Software Hierarchy', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/learn-how-web-development-fits-into-the-greater-software-hierarchy/', 1);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (4, 4, 'Reflection: Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/reflection-web-development/', 1);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (5, 5, 'Learn what HTML is and what it is used for in Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-html-2/topic/learn-what-html-is-and-what-it-is-used-for-in-web-development/', 2);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (6, 6, 'Learn to utilize common HTML tags and attributes to mark up a basic page of content', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-html-2/topic/learn-to-utilize-common-html-tags-and-attributes-to-mark-up-a-basic-page-of-content/', 2);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (7, 7, 'Learn about the Box Model and be able to explain its properties', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/learn-about-the-box-model-and-be-able-to-explain-its-properties/', 3);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (8, 8, 'Learn what CSS is and describe its place in Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/learn-what-css-is-and-describe-its-place-in-web-development/', 3);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (9, 9, 'Quiz: HTML and CSS (1/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-1-3/', 3);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (10, 10, 'Quiz: HTML and CSS (2/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-2-3/', 3);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (11, 11, 'Quiz: HTML and CSS (3/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-3-3/', 3);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (12, 12, 'Learn what JavaScript is and be able to explain its uses in web development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-what-javascript-is-and-be-able-to-explain-its-uses-in-web-development/', 4);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (13, 13, 'Quiz: Variables and Primitive Data Types', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-variables-and-primitive-data-types/', 4);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (14, 14, 'Learn to use Math, Properties, Methods and Global Objects in JavaScript', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-to-use-math-properties-methods-and-global-objects-in-javascript/', 4);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (15, 15, 'Quiz: Math, Properties, Methods, and Global Objects', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-math-properties-methods-and-global-objects/', 4);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (16, 16, 'Learn to use basic control flow and if/else statements.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-to-use-basic-control-flow-and-if-else-statements/', 4);
INSERT INTO objectives
  (id, number, objective, url, lesson_id)
  VALUES
  (17, 17, 'Quiz: Introduction to Control Flow', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-introduction-to-control-flow/', 4);


INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (1, 1, 1, TRUE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (2, 2, 1, TRUE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (3, 3, 1, FALSE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (4, 1, 2, TRUE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (5, 2, 2, FALSE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (6, 3, 2, FALSE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (7, 1, 3, FALSE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (8, 2, 3, FALSE);
INSERT INTO activities
  (id, objectives_id, user_id, complete)
  VALUES
  (9, 3, 3, FALSE);
