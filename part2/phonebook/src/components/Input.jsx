const Input = ({text, handleChange, value}) =>(
    <div>{text}: <input value={value} onChange={handleChange}/></div>
)
export default Input