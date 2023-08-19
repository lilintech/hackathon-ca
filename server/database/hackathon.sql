-- users, reported_crimes, quiz_categories, quiz_questions, quiz_options, userquizScores
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
    crime_id bigint primary key auto_increment,
    user_id bigint,
    crime_type varchar(255) NOT NULL,
    crime_description TEXT,
    date_reported date,
    foreign key (user_id) references Users(user_id)
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
