const PersonForm = (props) => {
    return <form onSubmit={props.onSubmit}>
        <div>
          name: <input
            onChange={props.onNameChange}
          />
        </div>
        <div>number: <input
            onChange={props.onPhonenoChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
}

export default PersonForm