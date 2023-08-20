-- users, reported_crimes, quiz_categories, quiz_questions, quiz_options, userquizScores
CREATE TABLE CrimesTypes(
    crime_id int primary key auto_increment,
    crime_type varchar(255)
);
CREATE TABLE QuizCategories (
    category_id int auto_increment primary key,
    category_name varchar(255) not null
);
CREATE TABLE Users (
    user_id bigint primary key auto_increment,
    username varchar(255) not null UNIQUE,
    email varchar(255) not null UNIQUE,
    password_hash varchar(255),
    profile_pic VARCHAR(255)
);



CREATE TABLE ReportedCrimes (
    report_id bigint primary key auto_increment,
    email_address varchar(255),
    phone_number varchar(20),
    gender varchar(10),
    first_name varchar(255),
    last_name varchar(255),
    date_reported date default curdate(),
    crime_description TEXT,
    crime_id int,
    foreign key (crime_id) references CrimesTypes(crime_id)
);



CREATE TABLE QuizQuestions (
    question_id bigint auto_increment,
    category_id int,
    question_text TEXT,
    correct_answer varchar(255) not null,
    primary key (question_id),
    foreign key (category_id) references QuizCategories(category_id)
);

CREATE TABLE QuizOptions (
    question_id bigint auto_increment,
    option_id int,
    option_text varchar(255) not null,
    primary key (question_id, option_id),
    foreign key (question_id) references QuizQuestions(question_id)
);

CREATE TABLE UserQuizScores (
    score_id int primary key auto_increment,
    user_id bigint,
    category_id int,
    score int,
    date_taken DATE,
    foreign key (user_id) references Users(user_id),
    foreign key (category_id) references QuizCategories(category_id)
);
