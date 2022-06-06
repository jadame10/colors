import './App.css';

function Input({setParentCounter}){

    const onTrigger = (event) => {
        setParentCounter(event.target.myname.value);
        event.preventDefault();
    }
    return(
        <div className = 'main-input'>
            <form onSubmit = {(e) => onTrigger(e)}>
                <input type = "number" 
                name = "myname" placeholder = "Filter results by Id"
                min = '1' max = '12' />
                <input type = "submit"  value = "Submit id" 
                style ={{backgroundColor: 'limegreen', border: '2px solid limegreen'}} />
                <br></br><br></br>
            </form>
        </div>

    );
}
export default Input;