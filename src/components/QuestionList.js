import React, {useState, useEffect} from "react";
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions]=useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then((response)=>response.json())
    .then((questions)=> setQuestions(questions))
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions${id}`,{
      method: "DELETE",
  })
    .then((response)=>response.json())
    .then(()=>{
      const deletedQuestion = questions.filter((question)=>question.id !== id);
        setQuestions(deletedQuestion)
      })
    }
  
  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
    .then((response)=>response.json())
    .then((updatedQuestion)=>{
      const updatedQuestions = questions.map((question)=>{
        if(question.id===updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions)
    })
  }
  
  const eachQuestion = questions.map((e)=>(
       <QuestionItem key={e.id} question={e} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange} />
  ));
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{eachQuestion}</ul>
    </section>
  );
}

export default QuestionList;
