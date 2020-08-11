import React from 'react';
import whatsappImg from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';



export interface Teacher{
    id: number
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps{
    teacher: Teacher;
}

const TeacherItem:React.FunctionComponent<TeacherItemProps> = ( { teacher } ) => {
    function createNewConnection(){
        api.post('/connections', {
            user_id: teacher.id,
        })
    }
    
    return(
    <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a   target="_blank"
                     onClick={createNewConnection} 
                     href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappImg} alt="Entrar em contato"/>
                    Entrar em conatato
                </a>
            </footer>
    </article>
    );
}
export default TeacherItem;