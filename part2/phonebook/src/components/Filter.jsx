import Input from './Input'
const Filter = ({handleChange, search}) => (
    <div>
      <label>
        <Input text='filter shown with' handleChange={handleChange} value={search}/>
      </label>
    </div>
  )
export default Filter