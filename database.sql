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
DROP TABLE scores;
DROP TABLE tags;
DROP TABLE objective_tags;

-- Insert this code inside your better_change database
CREATE TABLE organizations(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  type VARCHAR(100),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  photo VARCHAR(500) DEFAULT '/static/assets/images/default-profile.png',
  username VARCHAR(200) NOT NULL UNIQUE,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  tel VARCHAR(30) UNIQUE,
  bio VARCHAR(500) DEFAULT 'Change your profile picture and bio in the update profile link below',
  location VARCHAR(500),
  creation_date TIMESTAMP WITH TIME ZONE,
  slack_user_id VARCHAR(100) UNIQUE,
  slack_team_id VARCHAR(100),
  slack_display_name VARCHAR(100)
);

CREATE TABLE courses(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  badge VARCHAR(500),
  mastery_score INT,
  organization_id INT,
  FOREIGN KEY (organization_id) REFERENCES organizations (id)
);

CREATE TABLE lessons(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  mastery_score INT,
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE objectives(
  id SERIAL PRIMARY KEY,
  number INT,
  objective VARCHAR(1000) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  mastery_score INT,
  lesson_id INT,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
);

CREATE TABLE activities(
  id SERIAL PRIMARY KEY,
  type VARCHAR(100),
  node_id INT,
  objective_id INT,
  lesson_id INT,
  course_id INT,
  user_id INT,
  complete BOOLEAN DEFAULT FALSE,
  completion_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (node_id) REFERENCES nodes (id),
  FOREIGN KEY (objective_id) REFERENCES objectives (id),
  FOREIGN KEY (lesson_id) REFERENCES lessons (id),
  FOREIGN KEY (course_id) REFERENCES courses (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
  topic VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE objective_tags (
  id SERIAL PRIMARY KEY,
  objective_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (objective_id) REFERENCES objectives (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);

CREATE TABLE nodes(
  id SERIAL PRIMARY KEY,
  number INT,
  node VARCHAR(1000) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  mastery_score INT,
);

CREATE TABLE objective_nodes (
  id SERIAL PRIMARY KEY,
  objective_id INT NOT NULL,
  node_id INT NOT NULL,
  FOREIGN KEY (objective_id) REFERENCES objectives (id),
  FOREIGN KEY (node_id) REFERENCES nodes (id)
);

INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date, type)
  VALUES
  (1, 'Matt', 'Collier', '/static/assets/images/matt.png', 'matt', 'matt@encode.app', '$2b$12$UtVNV8XoRRh0N5/MnPy3Tu8AIQMGda3VWXVjW03qUTMypLXY.sSOW', '01234567890', 'University drop out. Product / Code / Sales previously at @pusher @gocardless @mintdigital', 'Devon, UK', '2018-10-21T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date, type)
  VALUES
  (2, 'Roland', 'Levy', '/static/assets/images/Roland.jpg', 'roland', 'test@gmail.com', '$2b$12$UtVNV8XoRRh0N5/MnPy3Tu8AIQMGda3VWXVjW03qUTMypLXY.sSOW', '01234567899', 'Constructor Labs alumni, Bhuddist guru', 'London, UK', '2018-10-22T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date, type)
  VALUES
  (3, 'Dmitri', 'Grabov', '/static/assets/images/dmitri.jpeg', 'dmitri', 'testing@gmail.com', '$2b$12$UtVNV8XoRRh0N5/MnPy3Tu8AIQMGda3VWXVjW03qUTMypLXY.sSOW', '01234567898', 'Constructor Labs founder', 'London, UK', '2018-10-23T10:37:33.735972Z');
ALTER SEQUENCE users_id_seq RESTART WITH 4 INCREMENT BY 1;


INSERT INTO organizations
  (id, name, url)
  VALUES
  (1, 'Lambda School', 'https://lambdaschool.com');


INSERT INTO courses
  (id, name, url, badge, organization_id)
  VALUES
  (1, 'Web Development Precourse', 'https://apply.lambdaschool.com/courses/web-precourse/', '/static/assets/images/lambda-precourse-logo.svg', 1);
INSERT INTO courses
  (id, name, url, badge, organization_id)
  VALUES
  (2, 'Data Science Precourse', 'https://apply.lambdaschool.com/courses/ds-precourse/', '/static/assets/images/lambda-precourse-logo.svg', 1);
INSERT INTO courses
  (id, name, url, badge, organization_id)
  VALUES
  (3, 'Web Development Full Time', 'https://apply.lambdaschool.com/courses/web/', '/static/assets/images/lambda-fulltime-logo.svg', 1);
INSERT INTO courses
  (id, name, url, badge, organization_id)
  VALUES
  (4, 'Data Science Full Time', 'https://apply.lambdaschool.com/courses/ds/', '/static/assets/images/lambda-fulltime-logo.svg', 1);


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
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (5, 'JavaScript: Control Flow', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (6, 'JavaScript: Functions', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (7, 'JavaScript: Data Structures', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (8, 'JavaScript: Classes', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-classes-2/', 1);
INSERT INTO lessons
  (id, name, url, course_id)
  VALUES
  (9, 'JavaScript: Callback Functions', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-callback-functions/', 1);


INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (1, 1, 'Learn to “think like a Software Engineer”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/learn-to-think-like-a-software-engineer/', 1, 1);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (2, 2, 'Quiz: What does it mean to “think like a software engineer?”', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/quiz-what-does-it-mean-to-think-like-a-software-engineer/', 3, 1);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (3, 3, 'Learn how web development fits into the Greater Software Hierarchy', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/learn-how-web-development-fits-into-the-greater-software-hierarchy/', 1, 1);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (4, 4, 'Reflection: Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-web-development-fundamentals/topic/reflection-web-development/', 2, 1);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (5, 5, 'Learn what HTML is and what it is used for in Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-html-2/topic/learn-what-html-is-and-what-it-is-used-for-in-web-development/', 1, 2);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (6, 6, 'Learn to utilize common HTML tags and attributes to mark up a basic page of content', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-html-2/topic/learn-to-utilize-common-html-tags-and-attributes-to-mark-up-a-basic-page-of-content/', 1, 2);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (7, 7, 'Learn about the Box Model and be able to explain its properties', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/learn-about-the-box-model-and-be-able-to-explain-its-properties/', 1, 3);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (8, 8, 'Learn what CSS is and describe its place in Web Development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/learn-what-css-is-and-describe-its-place-in-web-development/', 1, 3);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (9, 9, 'Quiz: HTML and CSS (1/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-1-3/', 3, 3);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (10, 10, 'Quiz: HTML and CSS (2/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-2-3/', 3, 3);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (11, 11, 'Quiz: HTML and CSS (3/3)', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-css/topic/quiz-html-and-css-3-3/', 3, 3);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (12, 12, 'Learn what JavaScript is and be able to explain its uses in web development', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-what-javascript-is-and-be-able-to-explain-its-uses-in-web-development/', 1, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (13, 13, 'Quiz: Variables and Primitive Data Types', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-variables-and-primitive-data-types/', 3, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (14, 14, 'Learn to use Math, Properties, Methods and Global Objects in JavaScript', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-to-use-math-properties-methods-and-global-objects-in-javascript/', 1, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (15, 15, 'Quiz: Math, Properties, Methods, and Global Objects', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-math-properties-methods-and-global-objects/', 3, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (16, 16, 'Learn to use basic control flow and if/else statements.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/learn-to-use-basic-control-flow-and-if-else-statements/', 1, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (17, 17, 'Quiz: Introduction to Control Flow', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/introduction-to-javascript-2/topic/quiz-introduction-to-control-flow/', 3, 4);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (18, 18, 'Learn to write control flow using if/else statements', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/topic/learn-to-write-control-flow-using-if-else-statements/', 1, 5);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (19, 19, 'Quiz: Control Flow Continued', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/topic/quiz-control-flow-continued/', 3, 5);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (20, 20, 'Learn to write a basic for loop', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/topic/learn-to-write-a-basic-for-loop/', 1, 5);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (21, 21, 'Quiz: For Loops', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/topic/quiz-for-loops/', 3, 5);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (22, 22, 'Learn to use different operators.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-control-flow-2/topic/learn-to-use-different-operators/', 1, 5);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (23, 23, 'Learn why we use JavaScript Functions and be able to write correct function syntax.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/learn-why-we-use-javascript-functions-and-be-able-to-write-correct-function-syntax/', 1, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (24, 24, 'Quiz: Anatomy of a Function', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/quiz-anatomy-of-a-function/', 3, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (25, 25, 'Learn to write and call functions using arguments and parameters.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/learn-to-write-and-call-functions-using-arguments-and-parameters/', 1, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (26, 26, 'Quiz: Arguments and Parameters', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/quiz-arguments-and-parameters/', 3, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (27, 27, 'Learn to explain function scope and the return statement.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/learn-to-explain-function-scope-and-the-return-statement/', 2, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (28, 28, 'Quiz: Scope and Return Statements', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-functions-2/topic/quiz-scope-and-return-statements/', 3, 6);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (29, 29, 'Learn to use arrays to store and access data.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/learn-to-use-arrays-to-store-and-access-data/', 1, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (30, 30, 'Quiz: Intro to Arrays', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/quiz-intro-to-arrays/', 3, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (31, 31, 'Learn to use Array methods and properties', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/learn-to-use-array-methods-and-properties/', 1, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (32, 32, 'Quiz: Array Properies and Methods', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/quiz-array-properies-and-methods/', 3, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (33, 33, 'Learn to use objects to store and access data', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/learn-to-use-objects-to-store-and-access-data/', 1, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (34, 34, 'Quiz: Intro to Objects', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/quiz-intro-to-objects/', 3, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (35, 35, 'Learn to create methods on Objects, and utilize the ‘this’ keyword.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/learn-to-create-methods-on-objects-and-utilize-the-this-keyword/', 1, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (36, 36, 'Quiz: Methods, Loops, and the `this` Keyword', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-data-structures-2/topic/quiz-methods-loops-and-the-this-keyword/', 3, 7);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (37, 37, 'Learn to use classes, demonstrate when to use them and write and use ES5 class syntax.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-classes-2/topic/learn-to-use-classes-demonstrate-when-to-use-them-and-write-and-use-es5-class-syntax/', 1, 8);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (38, 38, 'Quiz: Intro to Classes', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-classes-2/topic/quiz-intro-to-classes/', 3, 8);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (39, 39, 'Learn to explain the prototype, how and why we use it.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-classes-2/topic/learn-to-explain-the-prototype-how-and-why-we-use-it/', 1, 8);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (40, 40, 'Quiz: The Class `prototype`', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-classes-2/topic/quiz-the-class-prototype/', 3, 8);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (41, 41, 'Learn to demonstrate understanding of and implement callbacks.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-callback-functions/topic/learn-to-demonstrate-understanding-of-and-implement-callbacks/', 2, 9);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (42, 42, 'Quiz: Intro to Callbacks', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-callback-functions/topic/quiz-intro-to-callbacks/', 3, 9);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (43, 43, 'Learn to use two basic array methods that use callbacks.', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-callback-functions/topic/learn-to-use-two-basic-array-methods-that-use-callbacks/', 1, 9);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (44, 44, 'Quiz: Using Callbacks in Array Methods', 'https://apply.lambdaschool.com/courses/web-precourse/lessons/javascript-callback-functions/topic/quiz-using-callbacks-in-array-methods/', 3, 9);
INSERT INTO objectives
  (id, number, objective, url, mastery_score, lesson_id)
  VALUES
  (45, 13, 'JS Assignment 1: Variables and Primitive Data Types', 'https://repl.it/student/submissions/7429462', 0, 9);

INSERT INTO nodes
  (id, favicon, node, url, mastery_score)
  VALUES
  (1, 'https://images.squarespace-cdn.com/content/v1/54849a7ee4b0b436d77f026f/1478021247807-SVT36TAN5AEZSGL6DO6L/ke17ZwdGBToddI8pDm48kLxnK526YWAH1qleWz-y7AFZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVH33scGBZjC30S7EYewNF5iKKwhonf2ThqWWOBkLKnojuqYeU1KwPvsAK7Tx5ND4WE/big_fvPcCRol_400x400-1472853779.jpg', 'JS Assignment 1: Variables and Primitive Data Types', 'https://repl.it/student/submissions/7429462', 0);
INSERT INTO nodes
  (id, favicon, node, url, mastery_score)
  VALUES
  (2, 'https://pbs.twimg.com/profile_images/880614604115775489/LNPwoiWi_400x400.jpg', 'JavaScript basics', 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics', 0);
INSERT INTO nodes
  (id, favicon, node, url, mastery_score)
  VALUES
  (3, 'https://images.squarespace-cdn.com/content/v1/54849a7ee4b0b436d77f026f/1478021247807-SVT36TAN5AEZSGL6DO6L/ke17ZwdGBToddI8pDm48kLxnK526YWAH1qleWz-y7AFZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVH33scGBZjC30S7EYewNF5iKKwhonf2ThqWWOBkLKnojuqYeU1KwPvsAK7Tx5ND4WE/big_fvPcCRol_400x400-1472853779.jpg', 'JS Assignment 1: Variables and Primitive Data Types', 'https://repl.it/student/submissions/7429462', 0);

INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (1, 'objective', 1, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (2, 'objective', 2, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (3, 'objective', 3, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (10, 'objective', 4, NULL, NULL, 1, TRUE, '2019-07-03T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (11, 'objective', 5, NULL, NULL, 1, TRUE, '2019-07-04T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (12, 'objective', 6, NULL, NULL, 1, TRUE, '2019-07-05T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (13, 'objective', 7, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (14, 'objective', 8, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (15, 'objective', 9, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (16, 'objective', 10, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (17, 'objective', 11, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (18, 'objective', 12, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (19, 'objective', 13, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (20, 'objective', 14, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (21, 'objective', 15, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (22, 'objective', 16, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (23, 'objective', 17, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (4, 'objective', 1, NULL, NULL, 2, TRUE, '2019-06-29T10:37:33.735972Z', '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (5, 'objective', 2, NULL, NULL, 2, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (6, 'objective', 3, NULL, NULL, 2, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (7, 'objective', 1, NULL, NULL, 3, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (8, 'objective', 2, NULL, NULL, 3, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (9, 'objective', 3, NULL, NULL, 3, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (24, 'objective', 18, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (25, 'objective', 19, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (26, 'objective', 20, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (27, 'objective', 21, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (28, 'objective', 22, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (29, 'objective', 23, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (30, 'objective', 24, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (31, 'objective', 25, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (32, 'objective', 26, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (33, 'objective', 27, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (34, 'objective', 28, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (35, 'objective', 29, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (36, 'objective', 30, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (37, 'objective', 31, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (38, 'objective', 32, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (39, 'objective', 33, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (40, 'objective', 34, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (41, 'objective', 35, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (42, 'objective', 36, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (43, 'objective', 37, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (44, 'objective', 38, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (45, 'objective', 39, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (46, 'objective', 40, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (47, 'objective', 41, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (48, 'objective', 42, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (49, 'objective', 43, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (50, 'objective', 44, NULL, NULL, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (51, 'course', NULL, NULL, 1, 1, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (52, 'course', NULL, NULL, 1, 2, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (53, 'course', NULL, NULL, 1, 3, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  (54, 'course', NULL, NULL, 1, 12, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
INSERT INTO activities
  (type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at)
  VALUES
  ('course', 45, NULL, NULL, 57, FALSE, NULL, '2019-06-29T10:36:33.735972Z');
ALTER SEQUENCE activities_id_seq RESTART WITH 55 INCREMENT BY 1;

INSERT INTO tags (id, topic) VALUES (1, 'javascript');
INSERT INTO tags (id, topic) VALUES (2, 'java');
INSERT INTO tags (id, topic) VALUES (3, 'c#');
INSERT INTO tags (id, topic) VALUES (4, 'php');
INSERT INTO tags (id, topic) VALUES (5, 'python');
INSERT INTO tags (id, topic) VALUES (6, 'android');
INSERT INTO tags (id, topic) VALUES (7, 'jquery');
INSERT INTO tags (id, topic) VALUES (8, 'html');
INSERT INTO tags (id, topic) VALUES (9, 'c++');
INSERT INTO tags (id, topic) VALUES (10, 'ios');
INSERT INTO tags (id, topic) VALUES (11, 'css');
INSERT INTO tags (id, topic) VALUES (12, 'mysql');
INSERT INTO tags (id, topic) VALUES (13, 'sql');
INSERT INTO tags (id, topic) VALUES (14, 'asp.net');
INSERT INTO tags (id, topic) VALUES (15, 'ruby-on-rails');
INSERT INTO tags (id, topic) VALUES (16, 'c');
INSERT INTO tags (id, topic) VALUES (17, 'arrays');
INSERT INTO tags (id, topic) VALUES (18, 'r');
INSERT INTO tags (id, topic) VALUES (19, 'objective-c');
INSERT INTO tags (id, topic) VALUES (20, '.net');
INSERT INTO tags (id, topic) VALUES (21, 'node.js');
INSERT INTO tags (id, topic) VALUES (22, 'json');
INSERT INTO tags (id, topic) VALUES (23, 'sql-server');
INSERT INTO tags (id, topic) VALUES (24, 'angularjs');
INSERT INTO tags (id, topic) VALUES (25, 'swift');
INSERT INTO tags (id, topic) VALUES (26, 'iphone');
INSERT INTO tags (id, topic) VALUES (27, 'regex');
INSERT INTO tags (id, topic) VALUES (28, 'ruby');
INSERT INTO tags (id, topic) VALUES (29, 'django');
INSERT INTO tags (id, topic) VALUES (30, 'ajax');
INSERT INTO tags (id, topic) VALUES (31, 'excel');
INSERT INTO tags (id, topic) VALUES (32, 'xml');
INSERT INTO tags (id, topic) VALUES (33, 'asp.net-mvc');
INSERT INTO tags (id, topic) VALUES (34, 'linux');
INSERT INTO tags (id, topic) VALUES (35, 'angular');
INSERT INTO tags (id, topic) VALUES (36, 'python-3.x');
INSERT INTO tags (id, topic) VALUES (37, 'database');
INSERT INTO tags (id, topic) VALUES (38, 'spring');
INSERT INTO tags (id, topic) VALUES (39, 'wordpress');
INSERT INTO tags (id, topic) VALUES (40, 'wpf');
INSERT INTO tags (id, topic) VALUES (41, 'reactjs');
INSERT INTO tags (id, topic) VALUES (42, 'vba');
INSERT INTO tags (id, topic) VALUES (43, 'string');
INSERT INTO tags (id, topic) VALUES (44, 'xcode');
INSERT INTO tags (id, topic) VALUES (45, 'windows');
INSERT INTO tags (id, topic) VALUES (46, 'vb.net');
INSERT INTO tags (id, topic) VALUES (47, 'laravel');
INSERT INTO tags (id, topic) VALUES (48, 'html5');
INSERT INTO tags (id, topic) VALUES (49, 'eclipse');
INSERT INTO tags (id, topic) VALUES (50, 'multithreading');
INSERT INTO tags (id, topic) VALUES (51, 'mongodb');
INSERT INTO tags (id, topic) VALUES (52, 'bash');
INSERT INTO tags (id, topic) VALUES (53, 'pandas');
INSERT INTO tags (id, topic) VALUES (54, 'git');
INSERT INTO tags (id, topic) VALUES (55, 'oracle');
INSERT INTO tags (id, topic) VALUES (56, 'postgresql');
INSERT INTO tags (id, topic) VALUES (57, 'forms');
INSERT INTO tags (id, topic) VALUES (58, 'twitter-bootstrap');
INSERT INTO tags (id, topic) VALUES (59, 'image');
INSERT INTO tags (id, topic) VALUES (60, 'macos');
INSERT INTO tags (id, topic) VALUES (61, 'algorithm');
INSERT INTO tags (id, topic) VALUES (62, 'python-2.7');
INSERT INTO tags (id, topic) VALUES (63, 'scala');
INSERT INTO tags (id, topic) VALUES (64, 'list');
INSERT INTO tags (id, topic) VALUES (65, 'visual-studio');
INSERT INTO tags (id, topic) VALUES (66, 'typescript');
INSERT INTO tags (id, topic) VALUES (67, 'winforms');
INSERT INTO tags (id, topic) VALUES (68, 'apache');
INSERT INTO tags (id, topic) VALUES (69, 'matlab');
INSERT INTO tags (id, topic) VALUES (70, 'facebook');
INSERT INTO tags (id, topic) VALUES (71, 'performance');
INSERT INTO tags (id, topic) VALUES (72, 'excel-vba');
INSERT INTO tags (id, topic) VALUES (73, 'entity-framework');
INSERT INTO tags (id, topic) VALUES (74, 'css3');
INSERT INTO tags (id, topic) VALUES (75, 'hibernate');
INSERT INTO tags (id, topic) VALUES (76, 'amazon-web-services');
INSERT INTO tags (id, topic) VALUES (77, 'sqlite');
INSERT INTO tags (id, topic) VALUES (78, 'function');
INSERT INTO tags (id, topic) VALUES (79, 'linq');
INSERT INTO tags (id, topic) VALUES (80, 'firebase');
INSERT INTO tags (id, topic) VALUES (81, 'azure');
INSERT INTO tags (id, topic) VALUES (82, 'swing');
INSERT INTO tags (id, topic) VALUES (83, 'rest');
INSERT INTO tags (id, topic) VALUES (84, 'shell');
INSERT INTO tags (id, topic) VALUES (85, 'qt');
INSERT INTO tags (id, topic) VALUES (86, 'powershell');
INSERT INTO tags (id, topic) VALUES (87, 'api');
INSERT INTO tags (id, topic) VALUES (88, 'maven');
INSERT INTO tags (id, topic) VALUES (89, '.htaccess');
INSERT INTO tags (id, topic) VALUES (90, 'file');
INSERT INTO tags (id, topic) VALUES (91, 'unit-testing');
INSERT INTO tags (id, topic) VALUES (92, 'selenium');
INSERT INTO tags (id, topic) VALUES (93, 'loops');
INSERT INTO tags (id, topic) VALUES (94, 'codeigniter');
INSERT INTO tags (id, topic) VALUES (95, 'perl');
INSERT INTO tags (id, topic) VALUES (96, 'spring-boot');
INSERT INTO tags (id, topic) VALUES (97, 'csv');
INSERT INTO tags (id, topic) VALUES (98, 'symfony');
INSERT INTO tags (id, topic) VALUES (99, 'numpy');
INSERT INTO tags (id, topic) VALUES (100, 'google-maps');
INSERT INTO tags (id, topic) VALUES (101, 'docker');
INSERT INTO tags (id, topic) VALUES (102, 'uitableview');
INSERT INTO tags (id, topic) VALUES (103, 'class');
INSERT INTO tags (id, topic) VALUES (104, 'web-services');
INSERT INTO tags (id, topic) VALUES (105, 'cordova');
INSERT INTO tags (id, topic) VALUES (106, 'google-chrome');
INSERT INTO tags (id, topic) VALUES (107, 'tsql');
INSERT INTO tags (id, topic) VALUES (108, 'sorting');
INSERT INTO tags (id, topic) VALUES (109, 'validation');
INSERT INTO tags (id, topic) VALUES (110, 'date');
INSERT INTO tags (id, topic) VALUES (111, 'android-studio');
INSERT INTO tags (id, topic) VALUES (112, 'sockets');
INSERT INTO tags (id, topic) VALUES (113, 'ruby-on-rails-3');
INSERT INTO tags (id, topic) VALUES (114, 'react-native');
INSERT INTO tags (id, topic) VALUES (115, 'express');
INSERT INTO tags (id, topic) VALUES (116, 'http');
INSERT INTO tags (id, topic) VALUES (117, 'xaml');
INSERT INTO tags (id, topic) VALUES (118, 'sql-server-2008');
INSERT INTO tags (id, topic) VALUES (119, 'android-layout');
INSERT INTO tags (id, topic) VALUES (120, 'dataframe');
INSERT INTO tags (id, topic) VALUES (121, 'apache-spark');
INSERT INTO tags (id, topic) VALUES (122, 'spring-mvc');
INSERT INTO tags (id, topic) VALUES (123, 'opencv');
INSERT INTO tags (id, topic) VALUES (124, 'email');
INSERT INTO tags (id, topic) VALUES (125, 'jsp');
INSERT INTO tags (id, topic) VALUES (126, 'datetime');
INSERT INTO tags (id, topic) VALUES (127, 'wcf');
INSERT INTO tags (id, topic) VALUES (128, 'oop');
INSERT INTO tags (id, topic) VALUES (129, 'listview');
INSERT INTO tags (id, topic) VALUES (130, 'c++11');
INSERT INTO tags (id, topic) VALUES (131, 'security');
INSERT INTO tags (id, topic) VALUES (132, 'dictionary');
INSERT INTO tags (id, topic) VALUES (133, 'parsing');
INSERT INTO tags (id, topic) VALUES (134, 'visual-studio-2010');
INSERT INTO tags (id, topic) VALUES (135, 'object');
INSERT INTO tags (id, topic) VALUES (136, 'user-interface');
INSERT INTO tags (id, topic) VALUES (137, 'ubuntu');
INSERT INTO tags (id, topic) VALUES (138, 'batch-file');
INSERT INTO tags (id, topic) VALUES (139, 'for-loop');
INSERT INTO tags (id, topic) VALUES (140, 'tensorflow');
INSERT INTO tags (id, topic) VALUES (141, 'delphi');
INSERT INTO tags (id, topic) VALUES (142, 'unity3d');
INSERT INTO tags (id, topic) VALUES (143, 'pointers');
INSERT INTO tags (id, topic) VALUES (144, 'templates');
INSERT INTO tags (id, topic) VALUES (145, 'google-app-engine');
INSERT INTO tags (id, topic) VALUES (146, 'ms-access');
INSERT INTO tags (id, topic) VALUES (147, 'variables');
INSERT INTO tags (id, topic) VALUES (148, 'if-statement');
INSERT INTO tags (id, topic) VALUES (149, 'debugging');
INSERT INTO tags (id, topic) VALUES (150, 'asp.net-mvc-4');
INSERT INTO tags (id, topic) VALUES (151, 'unix');
INSERT INTO tags (id, topic) VALUES (152, 'haskell');
INSERT INTO tags (id, topic) VALUES (153, 'actionscript-3');
INSERT INTO tags (id, topic) VALUES (154, 'hadoop');
INSERT INTO tags (id, topic) VALUES (155, 'session');
INSERT INTO tags (id, topic) VALUES (156, 'authentication');
INSERT INTO tags (id, topic) VALUES (157, 'matplotlib');
INSERT INTO tags (id, topic) VALUES (158, 'pdf');
INSERT INTO tags (id, topic) VALUES (159, 'android-fragments');
INSERT INTO tags (id, topic) VALUES (160, 'elasticsearch');
INSERT INTO tags (id, topic) VALUES (161, 'go');
INSERT INTO tags (id, topic) VALUES (162, 'ssl');
INSERT INTO tags (id, topic) VALUES (163, 'jpa');
INSERT INTO tags (id, topic) VALUES (164, 'jquery-ui');
INSERT INTO tags (id, topic) VALUES (165, 'vue.js');
INSERT INTO tags (id, topic) VALUES (166, 'asp.net-mvc-3');
INSERT INTO tags (id, topic) VALUES (167, 'tomcat');
INSERT INTO tags (id, topic) VALUES (168, 'cocoa');
INSERT INTO tags (id, topic) VALUES (169, 'generics');
INSERT INTO tags (id, topic) VALUES (170, 'internet-explorer');
INSERT INTO tags (id, topic) VALUES (171, 'magento');
INSERT INTO tags (id, topic) VALUES (172, 'xamarin');
INSERT INTO tags (id, topic) VALUES (173, 'web');
INSERT INTO tags (id, topic) VALUES (174, 'nginx');
INSERT INTO tags (id, topic) VALUES (175, 'asynchronous');
INSERT INTO tags (id, topic) VALUES (176, 'url');
INSERT INTO tags (id, topic) VALUES (177, 'animation');
INSERT INTO tags (id, topic) VALUES (178, 'ruby-on-rails-4');
INSERT INTO tags (id, topic) VALUES (179, 'jenkins');
INSERT INTO tags (id, topic) VALUES (180, 'testing');
INSERT INTO tags (id, topic) VALUES (181, 'curl');
INSERT INTO tags (id, topic) VALUES (182, 'ionic-framework');
INSERT INTO tags (id, topic) VALUES (183, 'flash');
INSERT INTO tags (id, topic) VALUES (184, 'firefox');
INSERT INTO tags (id, topic) VALUES (185, 'cocoa-touch');
INSERT INTO tags (id, topic) VALUES (186, 'ipad');
INSERT INTO tags (id, topic) VALUES (187, 'redirect');
INSERT INTO tags (id, topic) VALUES (188, 'jsf');
INSERT INTO tags (id, topic) VALUES (189, 'inheritance');
INSERT INTO tags (id, topic) VALUES (190, 'winapi');
INSERT INTO tags (id, topic) VALUES (191, 'selenium-webdriver');
INSERT INTO tags (id, topic) VALUES (192, 'laravel-5');
INSERT INTO tags (id, topic) VALUES (193, 'gradle');
INSERT INTO tags (id, topic) VALUES (194, 'recursion');
INSERT INTO tags (id, topic) VALUES (195, 'exception');
INSERT INTO tags (id, topic) VALUES (196, 'post');
INSERT INTO tags (id, topic) VALUES (197, 'd3.js');
INSERT INTO tags (id, topic) VALUES (198, 'github');
INSERT INTO tags (id, topic) VALUES (199, 'facebook-graph-api');
INSERT INTO tags (id, topic) VALUES (200, 'asp.net-core');
INSERT INTO tags (id, topic) VALUES (201, 'math');
INSERT INTO tags (id, topic) VALUES (202, 'join');
INSERT INTO tags (id, topic) VALUES (203, 'dom');
INSERT INTO tags (id, topic) VALUES (204, 'xslt');
INSERT INTO tags (id, topic) VALUES (205, 'opengl');
INSERT INTO tags (id, topic) VALUES (206, 'events');
INSERT INTO tags (id, topic) VALUES (207, 'select');
INSERT INTO tags (id, topic) VALUES (208, 'svg');
INSERT INTO tags (id, topic) VALUES (209, 'caching');
INSERT INTO tags (id, topic) VALUES (210, 'iis');
INSERT INTO tags (id, topic) VALUES (211, 'button');
INSERT INTO tags (id, topic) VALUES (212, 'machine-learning');
INSERT INTO tags (id, topic) VALUES (213, 'gcc');
INSERT INTO tags (id, topic) VALUES (214, 'image-processing');
INSERT INTO tags (id, topic) VALUES (215, 'asp.net-web-api');
INSERT INTO tags (id, topic) VALUES (216, 'heroku');
INSERT INTO tags (id, topic) VALUES (217, 'servlets');
INSERT INTO tags (id, topic) VALUES (218, 'assembly');
INSERT INTO tags (id, topic) VALUES (219, 'search');
INSERT INTO tags (id, topic) VALUES (220, 'logging');
INSERT INTO tags (id, topic) VALUES (221, 'matrix');
INSERT INTO tags (id, topic) VALUES (222, 'intellij-idea');
INSERT INTO tags (id, topic) VALUES (223, 'stored-procedures');
INSERT INTO tags (id, topic) VALUES (224, 'javafx');
INSERT INTO tags (id, topic) VALUES (225, 'mod-rewrite');
INSERT INTO tags (id, topic) VALUES (226, 'cakephp');
INSERT INTO tags (id, topic) VALUES (227, 'networking');
INSERT INTO tags (id, topic) VALUES (228, 'xpath');
INSERT INTO tags (id, topic) VALUES (229, 'canvas');
INSERT INTO tags (id, topic) VALUES (230, 'amazon-s3');
INSERT INTO tags (id, topic) VALUES (231, 'audio');
INSERT INTO tags (id, topic) VALUES (232, 'encryption');
INSERT INTO tags (id, topic) VALUES (233, 'flask');
INSERT INTO tags (id, topic) VALUES (234, 'java-ee');
INSERT INTO tags (id, topic) VALUES (235, 'optimization');
INSERT INTO tags (id, topic) VALUES (236, 'memory');
INSERT INTO tags (id, topic) VALUES (237, 'ggplot2');
INSERT INTO tags (id, topic) VALUES (238, 'video');
INSERT INTO tags (id, topic) VALUES (239, 'grails');
INSERT INTO tags (id, topic) VALUES (240, 'razor');
INSERT INTO tags (id, topic) VALUES (241, 'model-view-controller');
INSERT INTO tags (id, topic) VALUES (242, 'cookies');
INSERT INTO tags (id, topic) VALUES (243, 'android-intent');
INSERT INTO tags (id, topic) VALUES (244, 'meteor');
INSERT INTO tags (id, topic) VALUES (245, 'iframe');
INSERT INTO tags (id, topic) VALUES (246, 'arraylist');
INSERT INTO tags (id, topic) VALUES (247, 'callback');
INSERT INTO tags (id, topic) VALUES (248, 'array.map');
INSERT INTO tags (id, topic) VALUES (249, 'array.forEach');
INSERT INTO tags (id, topic) VALUES (250, 'annonymous-function');
INSERT INTO tags (id, topic) VALUES (251, 'array-method');

-- INSERT INTO tags (id, topic) VALUES (247, 'callback');
-- INSERT INTO tags (id, topic) VALUES (248, 'array.map');
-- INSERT INTO tags (id, topic) VALUES (249, 'array.forEach');
-- INSERT INTO tags (id, topic) VALUES (250, 'annonymous-function');
-- INSERT INTO tags (id, topic) VALUES (251, 'array-method');
-- INSERT INTO tags (id, topic) VALUES (253, 'web-development');
-- INSERT INTO tags (id, topic) VALUES (254, 'attributes');
-- INSERT INTO tags (id, topic) VALUES (256, 'mark-up');
-- INSERT INTO tags (id, topic) VALUES (257, 'inspect');
-- INSERT INTO tags (id, topic) VALUES (261, 'box-model');
-- INSERT INTO tags (id, topic) VALUES (262, 'margin');
-- INSERT INTO tags (id, topic) VALUES (263, 'border');
-- INSERT INTO tags (id, topic) VALUES (264, 'padding');
-- INSERT INTO tags (id, topic) VALUES (265, 'content');
-- INSERT INTO tags (id, topic) VALUES (266, 'top');
-- INSERT INTO tags (id, topic) VALUES (267, 'styling');
-- INSERT INTO tags (id, topic) VALUES (287, 'programming');
-- INSERT INTO tags (id, topic) VALUES (288, 'programming-languages');
-- INSERT INTO tags (id, topic) VALUES (289, 'job-role');
-- INSERT INTO tags (id, topic) VALUES (290, 'types-of-computer');
-- INSERT INTO tags (id, topic) VALUES (291, 'keywords');
-- INSERT INTO tags (id, topic) VALUES (292, 'syntax');
-- INSERT INTO tags (id, topic) VALUES (293, 'documentation');
-- INSERT INTO tags (id, topic) VALUES (294, 'text-editors');
-- INSERT INTO tags (id, topic) VALUES (295, 'sandbox-environment');
-- INSERT INTO tags (id, topic) VALUES (298, 'compiler');
-- INSERT INTO tags (id, topic) VALUES (299, 'software-engineer');
-- INSERT INTO tags (id, topic) VALUES (300, 'job-skills');
-- INSERT INTO tags (id, topic) VALUES (301, 'job-aims');
-- INSERT INTO tags (id, topic) VALUES (302, 'web-applications');
-- INSERT INTO tags (id, topic) VALUES (305, 'dynamic-applications');
-- INSERT INTO tags (id, topic) VALUES (306, 'web-browser');
-- INSERT INTO tags (id, topic) VALUES (307, 'development-cycles');
-- INSERT INTO tags (id, topic) VALUES (309, 'front-end');
-- INSERT INTO tags (id, topic) VALUES (310, 'back-end');
-- INSERT INTO tags (id, topic) VALUES (311, 'client');
-- INSERT INTO tags (id, topic) VALUES (312, 'server');
-- INSERT INTO tags (id, topic) VALUES (313, 'frameworks');
-- INSERT INTO tags (id, topic) VALUES (314, 'libraries');
-- INSERT INTO tags (id, topic) VALUES (315, 'open-source');
-- INSERT INTO tags (id, topic) VALUES (316, 'accessibility');
-- INSERT INTO tags (id, topic) VALUES (317, 'browser-compatibility');
-- INSERT INTO tags (id, topic) VALUES (318, 'load-times');
-- INSERT INTO tags (id, topic) VALUES (319, 'mark-up-language');
-- INSERT INTO tags (id, topic) VALUES (320, 'elements');
-- INSERT INTO tags (id, topic) VALUES (321, 'header');
-- INSERT INTO tags (id, topic) VALUES (322, 'paragraph');
-- INSERT INTO tags (id, topic) VALUES (323, 'images');
-- INSERT INTO tags (id, topic) VALUES (324, 'links');
-- INSERT INTO tags (id, topic) VALUES (325, 'open-tags');
-- INSERT INTO tags (id, topic) VALUES (326, 'closetag');
-- INSERT INTO tags (id, topic) VALUES (327, 'head');
-- INSERT INTO tags (id, topic) VALUES (328, 'body');
-- INSERT INTO tags (id, topic) VALUES (329, 'browser-inspector');
-- INSERT INTO tags (id, topic) VALUES (331, 'href');
-- INSERT INTO tags (id, topic) VALUES (332, 'image-tag');
-- INSERT INTO tags (id, topic) VALUES (333, 'src');
-- INSERT INTO tags (id, topic) VALUES (334, 'self-closing');
-- INSERT INTO tags (id, topic) VALUES (335, 'unordered-list');
-- INSERT INTO tags (id, topic) VALUES (336, 'ordered-list');
-- INSERT INTO tags (id, topic) VALUES (337, 'indenting');
-- INSERT INTO tags (id, topic) VALUES (338, 'anchor-tag');
-- INSERT INTO tags (id, topic) VALUES (339, 'width');
-- INSERT INTO tags (id, topic) VALUES (340, 'height');
-- INSERT INTO tags (id, topic) VALUES (341, 'pixels');
-- INSERT INTO tags (id, topic) VALUES (342, 'left');
-- INSERT INTO tags (id, topic) VALUES (343, 'right');
-- INSERT INTO tags (id, topic) VALUES (344, 'bottom');
-- INSERT INTO tags (id, topic) VALUES (345, 'border-style');
-- INSERT INTO tags (id, topic) VALUES (346, 'shorthand');
-- INSERT INTO tags (id, topic) VALUES (347, 'selector');
-- INSERT INTO tags (id, topic) VALUES (348, 'style-element');
-- INSERT INTO tags (id, topic) VALUES (349, 'stylesheet');
-- INSERT INTO tags (id, topic) VALUES (350, 'link-element');
-- INSERT INTO tags (id, topic) VALUES (351, 'property');
-- INSERT INTO tags (id, topic) VALUES (352, 'value');
-- INSERT INTO tags (id, topic) VALUES (353, 'id-selector');
-- INSERT INTO tags (id, topic) VALUES (354, 'wildcard-selector');
-- INSERT INTO tags (id, topic) VALUES (355, 'specificity');
-- INSERT INTO tags (id, topic) VALUES (356, 'codepen');
-- INSERT INTO tags (id, topic) VALUES (357, 'v8-engine');
-- INSERT INTO tags (id, topic) VALUES (358, 'es5');
-- INSERT INTO tags (id, topic) VALUES (359, 'es6');
-- INSERT INTO tags (id, topic) VALUES (360, 'console');
-- INSERT INTO tags (id, topic) VALUES (361, 'assignment');
-- INSERT INTO tags (id, topic) VALUES (362, 'number');
-- INSERT INTO tags (id, topic) VALUES (363, 'boolean');
-- INSERT INTO tags (id, topic) VALUES (364, 'global-objects');
-- INSERT INTO tags (id, topic) VALUES (365, 'Math');
-- INSERT INTO tags (id, topic) VALUES (366, 'object.length');
-- INSERT INTO tags (id, topic) VALUES (367, 'operators');
-- INSERT INTO tags (id, topic) VALUES (368, 'modulo');
-- INSERT INTO tags (id, topic) VALUES (369, 'float');
-- INSERT INTO tags (id, topic) VALUES (370, 'integer');
-- INSERT INTO tags (id, topic) VALUES (371, 'methods');
-- INSERT INTO tags (id, topic) VALUES (372, 'commenting')
ALTER SEQUENCE tags_id_seq RESTART WITH 252 INCREMENT BY 1;

INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (1, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (2, 289);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (3, 253);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (4, 253);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (5, 8);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (6, 8);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (7, 11);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (8, 11);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (9, 11);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (10, 8);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (11, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (12, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (13, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (14, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (15, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (16, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (45, 1);
INSERT INTO objective_tags
  (objective_id, tag_id)
  VALUES
  (44, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (5, 2, 4);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (6, 2, 6);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (7, 25, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (8, 25, 2);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (9, 25, 3);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (10, 3, 6);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (11, 4, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (12, 5, 2);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (13, 6, 3);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (14, 7, 6);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (15, 8, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (16, 9, 2);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (17, 10, 3);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (18, 11, 6);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (19, 12, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (20, 13, 2);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (21, 14, 3);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (22, 33, 3);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (23, 33, 4);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (24, 33, 5);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (25, 35, 8);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (26, 35, 19);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (27, 35, 33);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (28, 36, 99);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (29, 36, 122);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (30, 36, 56);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (31, 37, 44);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (32, 37, 156);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (33, 37, 200);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (34, 38, 18);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (35, 38, 77);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (36, 38, 200);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (37, 39, 87);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (38, 39, 91);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (39, 39, 92);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (40, 40, 81);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (41, 40, 99);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (42, 40, 23);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (43, 41, 199);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (44, 41, 37);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (45, 41, 57);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (46, 43, 1);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (47, 43, 78);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (48, 43, 17);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (49, 43, 247);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (50, 43, 248);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (51, 43, 249);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (52, 43, 250);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (53, 44, 248);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (54, 44, 249);
-- INSERT INTO objective_tags
--   (id, objective_id, tag_id)
--   VALUES
--   (55, 44, 250);
-- ALTER SEQUENCE objective_tags_id_seq RESTART WITH 56 INCREMENT BY 1;
