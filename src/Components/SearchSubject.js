import React from "react"
import SearchBook from "./SearchBook"
import "../index.css"

class SearchSubject extends React.Component{
    constructor() {
        super()
        this.state = {
            subjectText: "",
            didSubmit: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //The handle submit function controls whether the SearchBook
    //component will update. If it is set to true then the 
    //component is called with the subjectText being passed
    //by prop instead of just null.
    handleSubmit(event) {
        event.preventDefault()    
        this.setState({ didSubmit: true })
    }

    render() {
        return (
            <div>
                <div className="suggestion">
                    <p>(Try action, adventure or romance.)</p>
                </div>
                <div className="search-bar">
                    <form onSubmit={this.handleSubmit}> 
                        <input 
                            type="text" 
                            value={this.state.subjectText}
                            name="subjectText"
                            placeholder="Enter a single book genre"
                            onChange={this.handleChange}
                        />
                        <button>Search</button>
                    </form>
                </div>
                <div>
                    {this.state.didSubmit ? <SearchBook subjectText={this.state.subjectText} /> : <SearchBook subjectText={null} />}
                </div>
            </div>
        )
    }
}

export default SearchSubject