let Task: {id: number, title: string, isCompleted: boolean}[]
 Task = [
	{
		id: 1,
		title: 'Learnt HTML',
		isCompleted:false

	},                           
	{
		id: 2,
		title: 'Learnt CSS',
		isCompleted:false
			
	},
	{
		id: 3,
		title: 'Learnt Javascript', 
		isCompleted:false  
	}
]

let id:number = 3
const setId = ():number => {
	id++
	return id
}

const textInput = document.querySelectorAll('.form form input')[0] as HTMLInputElement;

const addTodo = (event:Event)  => {
	event.preventDefault();
	console.log(textInput.value)
  const ul = document.querySelector('ul')as HTMLUListElement;
	if(textInput.value !== ''){
        const textInputValue = textInput.value.charAt(0).toUpperCase() + textInput.value.slice(1);
		Task.push({id: setId(), title: textInputValue, isCompleted:false})
		console.log(Task)
        ul.innerHTML += taskList(Task[Task.length - 1])
		updateChecked();
		textInput.value = '';
	}else{
		alert('Please enter a task')
	}	
}



 const ul = document.querySelector('ul') as HTMLUListElement;
const taskList = (Task:{ id: number; title: string; isCompleted:boolean;}):string => {
  const result = `<li>
	<input type="checkbox" id = ${Task.id} />
	<label for="task1">${Task.title}</label>
	<span onclick = "deleteTask(event)">&#10006;</span>
	</li>`
	return result;
}


	Task.forEach(Task => {
    ul.innerHTML += taskList(Task)
	})

	function updateIsCompleted(){
    Task.forEach((Task,i) => {
			const checkBox:any = document.querySelectorAll('input[type = "checkbox"]');
      //console.log( checkBox.length)
        if(Task.isCompleted) {
					checkBox[i].parentElement.style.textDecoration = 'line-through';
				}else if(!Task.isCompleted){
					checkBox[i].parentElement.style.textDecoration = 'none';
				}
		})
	}




function  updateChecked(){
	const checkBox:any = document.querySelectorAll('input[type = "checkbox"]')
	for(let i = 0; i < checkBox.length; i++){
		checkBox[i].addEventListener('change', () => {
			if(checkBox[i].checked){
				Task[i].isCompleted = true;
			}else{
				Task[i].isCompleted = false;
			}	
		//	console.log(checkBox[i].checked)	
			updateIsCompleted();
		})
	}
}

 	updateChecked();

	const deleteTask = (event:any) => {
		const ul = document.querySelector('ul') as HTMLUListElement;
		const id = event.target.parentElement.childNodes[1].id;
		Task = Task.filter(Task => Task.id !== Number(id))
		ul.innerHTML = Task.map(task => taskList(task)).join('')
		updateChecked();	
	}
	