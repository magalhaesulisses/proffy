import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import {useHistory} from 'react-router-dom';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){
    const history = useHistory();
    //Estados do proffy
    const[name, setName] = useState('');
    const[cpf, setCPF] = useState('');
    const[avatar, setAvatar] = useState('');
    const[bio, setBio] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    //Estado da aula
    const[subject, setSubject] = useState('');
    const[cost, setCost] = useState('');
    //Estado do agendamento
    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ]);
    //
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0,
            from: '',
            to: ''}
        ]);
    }
    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) =>{
            if (index === position){
                return {...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItem);
    }
    //Form
    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        api.post('/classes', {
            name,
            cpf,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas!"
            description = "O primeiro passo é preencher este formulário de inscrição" />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input  name="name" 
                                label="Nome completo" 
                                value={name} 
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                //No momento da alteração, será recebido um evento, no qual, dentro dele
                                //será possível resgatar o valor desejado.
                        />
                        <Input  name="cpf" 
                                label="CPF/CNPJ" 
                                value={cpf} 
                                onChange={(e) => {
                                    setCPF(e.target.value);
                                }}
                        />
                        <Input  name="avatar" 
                                label="Avatar"
                                value={avatar} 
                                onChange={(e) => {
                                    setAvatar(e.target.value);
                                }}
                        />
                        <Input  name="whatsapp" 
                                label="Whatsapp"
                                value={whatsapp} 
                                onChange={(e) => {
                                    setWhatsapp(e.target.value);
                                }}
                        />
                        <Textarea  name="bio" 
                                label="Biografia"
                                value={bio} 
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                        />
                    </fieldset>
                    <fieldset>
                    <legend>Sobre a aula</legend>
                        <Select
                        name="subject" 
                        label="Matéria"
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Ciências', label: 'Ciências'},
                            {value: 'Ed. Física', label: 'Ed. Física'},
                            {value: 'Física', label: 'Física'},
                            {value: 'História', label: 'História'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'Português', label: 'Português'},
                            {value: 'Quimica', label: 'Quimica'},
                        ]}
                        value={subject} 
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}
                        />
                        <Input  name="cost" 
                                label="Custo da sua hora/aula"
                                value={cost} 
                                onChange={(e) => {
                                    setCost(e.target.value);
                                }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                    {scheduleItems.map((scheduleItem, index) => {
                        return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select name="week_day" 
                                label="Dia da semana"
                                onChange = {e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                value={scheduleItem.week_day}
                                options={[
                                    {value: '0', label: 'Domingo'},
                                    {value: '1', label: 'Segunda-feira'},
                                    {value: '2', label: 'Terça-feira'},
                                    {value: '3', label: 'Quarta-feira'},
                                    {value: '4', label: 'Quinta-feira'},
                                    {value: '5', label: 'Sexta-feira'},
                                    {value: '6', label: 'Sábado'},
                                ]}
                                />
                                <Input  name="from" 
                                        label="Inicio" 
                                        type="time" 
                                        onChange = {e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={scheduleItem.from}
                                />
                                <Input  name="to" 
                                        label="Término" 
                                        type="time" 
                                        onChange = {e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to}
                                />
                            </div>
                        );
                    })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;