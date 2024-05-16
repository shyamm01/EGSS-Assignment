import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png"

const TaskCard = ({ title, preriority, description, handleEdit, handleDelete, index }) => {
    return (
        <article className={`task_card ${preriority}`} >
            <div className='task_card_bottom_line'>
                <p className='task_text'>{title}</p>
                <div className="task-card-button">
                    <div
                        className='task_delete'
                        onClick={() => handleEdit(index)}>
                        <img src={editIcon} className='edit_icon' alt='del' />
                    </div>
                    <div
                        className='task_delete'
                        onClick={() => handleDelete(index)}>
                        <img src={deleteIcon} className='delete_icon' alt='del' />
                    </div>
                </div>
            </div>
            <p>{description}</p>
        </article>
    );
};

export default TaskCard;
