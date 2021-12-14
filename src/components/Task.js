import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import addDays from 'date-fns/addDays'
import isToday from 'date-fns/isToday'

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

const FORMAT = 'dd/MM/yyyy';

const AddTask=({onCancel, onAdd})=>{
    const [addInput, setAddInput] = useState('')
    const [date, setDate] = useState(new Date());
    return(
        <div className='add-task-dialog'>
                <input onChange={(e)=>{setAddInput(e.target.value)}} />
                <div className='add-task-actions-container'>
                    <div className='btns-container'>
                        <button 
                            onClick={()=>{onAdd(addInput, date); onCancel(); setAddInput('')}}
                            className='add-btn'
                            disabled={!addInput}
                            // disabled={addInput.length === 0 ? true : false}
                        >
                            Add Task
                        </button>
                        <button
                            onClick={onCancel}
                            className='cancel-btn'
                        >
                            Cancel
                        </button>
                    </div>
                    <div className='calendar'>
                        <DayPickerInput
                            onDayChange={(e)=>{setDate(e)}}
                            placeholder={dateFnsFormat(new Date(),FORMAT)}
                            formatDate={formatDate}
                            format={FORMAT}
                            dayPickerProps={{
                                modifiers :{
                                    disabled :{before :new Date()}
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
    )
}
const next7Days=(item)=>{
    return isAfter(item.date,new Date()) && isBefore(item.date, addDays(new Date(),7))
}

const TaskItems=({tasks,header})=>{
    let tasksToRender =[...tasks];
    if(header === 'NEXT 7 DAYS')
        tasksToRender=tasksToRender.filter((item)=>next7Days(item));
    if(header === 'TODAY')
        tasksToRender=tasksToRender.filter((item)=>isToday(item.date));

    return (
        <div className='task-items-container'>
            {tasksToRender.map((item)=>(
                <div className='task-item'>
                    <ul><li >{item.text} </li></ul>
                    <p>{dateFnsFormat(new Date(item.date),FORMAT)}</p>
                </div>
            ))}
        </div>
        
    );
}

function Task({header}){
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    const addNewTask=(text, date)=>{
        const newTask={text , date }
        setTasks([...tasks,newTask])
    }

    return (
        <div className='task'>
            <h1 className='heading'>{header}</h1>
            {header ==='INBOX' ? <div onClick={()=>setShowAddTask(!showAddTask)} className='add-task-btn'>
                <span className='plus'>+ </span>
                <span className='add-task-text'>Add Task</span>
            </div> : null}
            {showAddTask ? 
                <AddTask 
                    onAdd={addNewTask}
                    onCancel={()=>{setShowAddTask(false)}}
                /> : null
            }
            {tasks.length > 0 ? <TaskItems tasks={tasks} header={header}/> : <p>No tasks yet</p>}
        </div>
    )
}
export default Task;
