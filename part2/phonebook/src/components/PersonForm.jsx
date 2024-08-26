import Input from './Input'
const PersonForm = (props) => (
    <form onSubmit={props.handlePerson}>
        <Input text='Name' handleChange={props.handleName} value={props.name}/>
        <Input text='Number' handleChange={props.handleNumber} value={props.number}/>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)
export default PersonForm