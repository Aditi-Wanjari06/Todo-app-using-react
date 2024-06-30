import React from 'react'
import "./ToDoCard.css"
import ImgDel from "./delete.png"

function ToDoCard({index , task, category, deleteItem}) {

  const CATEGORY_EMOGI_MAP = {
    learning: "📚",
    work:"👩‍💻",
    personal: "🏠",
    shopping:"🛒",
    health:"👩‍⚕️",
    others:"📁"
}

const CATEGORY_COLORS = {
  learning: "#f1c40f",
  work:"#d27979",
  personal: "#2ecc71",
  shopping:"#e74c3c",
  health:"#9b59b6",
  others:"#ffaa80"
}

  return (
    <div className='todo-card'>
      
      <img src={ImgDel} alt='Delete'
       className='delete-icon' 
       onClick={()=>{
        deleteItem(index)
       }}
       />
        {task} 
        <span className='category' style={{backgroundColor: CATEGORY_COLORS[category]

        }}>
          {
        CATEGORY_EMOGI_MAP[category]}
          {category}
          </span>

    </div>
  )
}

export default ToDoCard