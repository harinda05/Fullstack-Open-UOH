const SearchForm = (props) => {
    return <form>
        <div>
            find countries <input
                onChange={props.onSearchStringChange}
            />
        </div>
    </form>
}

export default SearchForm