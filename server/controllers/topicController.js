const connection = require("../db");

// get all topics (topic name, desc, id)
const getAllTopics = (req, res) => {
  try {
    // query db
    connection.query(
      "SELECT topic_id, topic_name, topic_description FROM QuizTopics",
      [],
      (err, results, fields) => {
        if (err) {
          console.log(err.sqlMessage);
          return res.status(500).json({ message: "Failed to get data" });
        }
        return res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occurred" + error);
  }
};

// get questons and options for that level selected
const getQuestionsAndOptions = (req, res) => {
  const { topic_id, difficulty_level } = req.body;

  try {
    // query db
    // `SELECT question_id, question_text FROM QuizQuestions WHERE (topic_id = ? AND difficulty_level = ?)`,

    connection.query(
      `SELECT
        qq.question_id,
        qq.question_text,
        qo.option_id,
        qo.option_text,
        qo.is_correct_option
    FROM
        QuizQuestions AS qq
    JOIN
        QuizOptions AS qo ON qq.question_id = qo.question_id
    WHERE
        qq.topic_id = ? AND qq.difficulty_level = ?`,
      [topic_id, difficulty_level],
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Failed to get data" });
        }
        // todo array reduce
        const questionsWithOptions = result.reduce((accumulator, row) => {
          const existingQuestion = accumulator.find(
            (question) => question.question_id === row.question_id
          );

          if (existingQuestion) {
            existingQuestion.options.push({
              option_id: row.option_id,
              option_text: row.option_text,
              is_correct_option: row.is_correct_option,
            });
          } else {
            accumulator.push({
              question_id: row.question_id,
              question_text: row.question_text,
              options: [
                {
                  option_id: row.option_id,
                  option_text: row.option_text,
                  is_correct_option: row.is_correct_option,
                },
              ],
            });
          }

          return accumulator;
        }, []);

        return res.json(questionsWithOptions);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occurred" + error);
  }
};

module.exports = { getAllTopics, getQuestionsAndOptions };
