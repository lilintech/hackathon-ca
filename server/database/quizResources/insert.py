import json
import mysql.connector

# mysql connection
db = mysql.connector.connect(
    host="127.0.0.1",
    user="nixcraft",
    password="root",
    database="hackathon"
)
# load json data from quoz)questions.json
with open("quiz_questions.json", "r") as json_file:
    quiz_data = json.load(json_file)

# iterate thru json data
for topic_data in quiz_data:
    topic_name = topic_data["topic"]
    for question_data in topic_data["questions"]:
        difficulty = question_data["difficulty"]
        question_text = question_data["question"]
        options = question_data["options"]
        correct_answer_index = question_data["correct_answer"]

        # insert question to QuizQuestions table
        question_insert_query = """
        INSERT INTO QuizQuestions (topic_id, question_text, difficulty_level, correct_answer_index)
        VALUES ((SELECT topic_id FROM QuizTopics WHERE topic_name = %s), %s, %s, %s)
        """
        question_values = (topic_name, question_text, difficulty, correct_answer_index)

        cursor = db.cursor()
        cursor.execute(question_insert_query, question_values)
        db.commit()

        question_id = cursor.lastrowid

        #insert options to QuizOptions table
        for option_index, option_text in enumerate(options):
            is_correct = 1 if option_index == correct_answer_index else 0
            option_insert_query = """
            INSERT INTO QuizOptions (question_id, option_text, is_correct_option)
            VALUES (%s, %s, %s)
            """
            option_values = (question_id, option_text, is_correct)

            cursor.execute(option_insert_query, option_values)
            db.commit()

#close db connection
db.close()
