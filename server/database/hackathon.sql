-- users, reported_crimes, quiz_categories, quiz_questions, quiz_options, userquizScores
CREATE TABLE CrimesTypes(
    crime_id int primary key auto_increment,
    crime_type varchar(255)
);
CREATE TABLE QuizTopics (
    topic_id int primary key auto_increment,
    topic_name varchar(255),
    topic_description TEXT
);
CREATE TABLE Users (
    user_id int primary key auto_increment,
    username varchar(255) not null UNIQUE,
    email varchar(255) not null UNIQUE,
    password_hash varchar(255),
    verified BOOLEAN not null,
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
    question_id int auto_increment primary key,
    topic_id int,
    question_text TEXT,
    difficulty_level varchar(20),
    correct_answer_index int,
    foreign key (topic_id) references QuizTopics(topic_id)
);
CREATE TABLE QuizOptions (
    option_id int primary key auto_increment,
    question_id int,
    option_text TEXT,
    is_correct_option BOOLEAN,
    foreign key (question_id) references QuizQuestions(question_id)
);
CREATE TABLE UserResponses(
    response_id int primary key auto_increment,
    user_id int,
    question_id int,
    selected_option_id int,
    is_correct BOOLEAN,
    foreign key (user_id) references Users(user_id),
    foreign key (question_id) references QuizQuestions(question_id),
    foreign key (selected_option_id) references QuizOptions(option_id)
);
CREATE TABLE UserQuizScores (
    score_id int primary key auto_increment,
    user_id int,
    topic_id int,
    score int,
    difficulty_level varchar(20),
    date_taken DATE,
    foreign key (user_id) references Users(user_id),
    foreign key (topic_id) references QuizTopics(topic_id)
);
CREATE TABLE QuizQuestionsMetadata (
    metadata_id int primary key auto_increment,
    question_id int,
    tags varchar(255),
    foreign key (question_id) references QuizQuestions(question_id)
);
-- insert statement for quiz topics
INSERT INTO QuizTopics (topic_name, topic_description)
VALUES (
        'Encryption',
        'Learn about the techniques used to secure data through encryption.'
    ),
    (
        'Phishing',
        'Understand the tactics cybercriminals use to trick individuals into revealing sensitive information.'
    ),
    (
        'Malware',
        'Explore the various types of malicious software and their impact.'
    ),
    (
        'Password Security',
        'Discover best practices for creating strong and secure passwords.'
    ),
    (
        'Network Security',
        'Gain insights into safeguarding networks from unauthorized access and threats.'
    ),
    (
        'Two-Factor Authentication (2FA)',
        'Learn how to add an extra layer of security to your accounts.'
    ),
    (
        'Social Engineering',
        'Examine how attackers manipulate human psychology to gain unauthorized access.'
    ),
    (
        'Data Breaches',
        'Understand the consequences of data breaches and steps to mitigate risks.'
    ),
    (
        'Secure Browsing',
        'Find out how to stay safe while browsing the internet.'
    ),
    (
        'Identity Theft',
        'Learn about the risks of identity theft and ways to protect your identity.'
    );

