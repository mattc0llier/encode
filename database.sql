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

-- Insert this code inside your better_change database
CREATE TABLE organizations(
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
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
  mastery_score INT,
  lesson_id INT,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
);

CREATE TABLE activities(
  id SERIAL PRIMARY KEY,
  type VARCHAR(100),
  objective_id INT,
  lesson_id INT,
  course_id INT,
  user_id INT,
  complete BOOLEAN DEFAULT FALSE,
  completion_time TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (objective_id) REFERENCES objectives (id),
  FOREIGN KEY (lesson_id) REFERENCES lessons (id),
  FOREIGN KEY (course_id) REFERENCES courses (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE scores(
  id SERIAL PRIMARY KEY,
  user_id INT,
  mastery INT,
  streak INT,
  objective_count INT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (1, 'Matt', 'Collier', '/static/assets/images/matt.png', 'matt', 'matt@encode.app', '$2b$12$UtVNV8XoRRh0N5/MnPy3Tu8AIQMGda3VWXVjW03qUTMypLXY.sSOW', '01234567890', 'University drop out. Product / Code / Sales previously at @pusher @gocardless @mintdigital', 'Devon, UK', '2018-10-21T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
  VALUES
  (2, 'Roland', 'Levy', '/static/assets/images/Roland.jpg', 'roland', 'test@gmail.com', '$2b$12$UtVNV8XoRRh0N5/MnPy3Tu8AIQMGda3VWXVjW03qUTMypLXY.sSOW', '01234567899', 'Constructor Labs alumni, Bhuddist guru', 'London, UK', '2018-10-22T10:37:33.735972Z');
INSERT INTO users
  (id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date)
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


INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (1, 'objective', 1, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (2, 'objective', 2, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (3, 'objective', 3, NULL, NULL, 1, TRUE, '2019-06-29T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (10, 'objective', 4, NULL, NULL, 1, TRUE, '2019-07-03T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (11, 'objective', 5, NULL, NULL, 1, TRUE, '2019-07-04T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (12, 'objective', 6, NULL, NULL, 1, TRUE, '2019-07-05T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (13, 'objective', 7, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (14, 'objective', 8, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (15, 'objective', 9, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (16, 'objective', 10, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (17, 'objective', 11, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (18, 'objective', 12, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (19, 'objective', 13, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (20, 'objective', 14, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (21, 'objective', 15, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (22, 'objective', 16, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (23, 'objective', 17, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (4, 'objective', 1, NULL, NULL, 2, TRUE, '2019-06-29T10:37:33.735972Z');
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (5, 'objective', 2, NULL, NULL, 2, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (6, 'objective', 3, NULL, NULL, 2, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (7, 'objective', 1, NULL, NULL, 3, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (8, 'objective', 2, NULL, NULL, 3, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (9, 'objective', 3, NULL, NULL, 3, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (24, 'objective', 18, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (25, 'objective', 19, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (26, 'objective', 20, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (27, 'objective', 21, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (28, 'objective', 22, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (29, 'objective', 23, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (30, 'objective', 24, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (31, 'objective', 25, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (32, 'objective', 26, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (33, 'objective', 27, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (34, 'objective', 28, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (35, 'objective', 29, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (36, 'objective', 30, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (37, 'objective', 31, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (38, 'objective', 32, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (39, 'objective', 33, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (40, 'objective', 34, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (41, 'objective', 35, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (42, 'objective', 36, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (43, 'objective', 37, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (44, 'objective', 38, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (45, 'objective', 39, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (46, 'objective', 40, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (47, 'objective', 41, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (48, 'objective', 42, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (49, 'objective', 43, NULL, NULL, 1, FALSE, NULL);
INSERT INTO activities
  (id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time)
  VALUES
  (50, 'objective', 44, NULL, NULL, 1, FALSE, NULL);
ALTER SEQUENCE activities_id_seq RESTART WITH 51 INCREMENT BY 1;

INSERT INTO scores
  (id, user_id, mastery, streak, objective_count)
  VALUES
  (1, 1, 0, 0, 0);
INSERT INTO scores
  (id, user_id, mastery, streak, objective_count)
  VALUES
  (2, 2, 0, 0, 0);
INSERT INTO scores
  (id, user_id, mastery, streak, objective_count)
  VALUES
  (3, 3, 0, 0, 0);
ALTER SEQUENCE scores_id_seq RESTART WITH 4 INCREMENT BY 1;
