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
  objective_id INT,
  user_id INT,
  complete BOOLEAN DEFAULT FALSE,
  completion_time TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (objective_id) REFERENCES objectives (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (1, 'Matt', 'Collier', '/static/assets/images/Roland.jpg', 'matt', 'matt@encode.app', 'password', '01234567890', 'University drop out. Product / Code / Sales previously at @pusher @gocardless @mintdigital', 'Devon, UK', '2018-10-21T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (2, 'Roland', 'Levy', '/static/assets/images/Rolandd.jpg', 'roland', 'test@gmail.com', 'password', '01234567899', 'Constructor Labs alumni, Bhuddist guru', 'London, UK', '2018-10-22T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (3, 'Dmitri', 'Grabov', '/static/assets/images/Rolanddd.jpg', 'dmitri', 'testing@gmail.com', 'password', '01234567898', 'Constructor Labs founder', 'London, UK', '2018-10-23T10:37:33.735972Z');


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
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (1, 1, 1, TRUE, '2018-10-28T10:37:33.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (2, 2, 1, TRUE, '2018-10-28T10:37:34.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (3, 3, 1, TRUE, '2018-10-28T10:37:35.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (10, 4, 1, TRUE, '2018-10-29T10:40:33.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (11, 5, 1, TRUE, '2018-10-29T10:40:34.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (12, 6, 1, TRUE, '2018-10-30T10:40:37.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (13, 7, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (14, 8, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (15, 9, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (16, 10, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (17, 11, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (18, 12, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (19, 13, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (20, 14, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (21, 15, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (22, 16, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (23, 17, 1, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (4, 1, 2, TRUE, '2018-10-28T10:37:33.735972Z');
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (5, 2, 2, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (6, 3, 2, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (7, 1, 3, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (8, 2, 3, FALSE, NULL);
INSERT INTO activities
  (id, objective_id, user_id, complete, completion_time)
  VALUES
  (9, 3, 3, FALSE, NULL);
