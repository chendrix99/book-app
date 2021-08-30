import React from "react"
import BookInfo from "./BookInfo"

class SearchBook extends React.Component {
    constructor() {
        super()
        this.state = {
            baseURL: "https://openlibrary.org",
            authorURL: "/authors/OL34221A",
            bookImg: "https://covers.openlibrary.org/b/id/7883980-L.jpg",
            imgID: "",
            bookTitle: "",
            bookAuthor: "",
            authorBio: "",
            bookBioURL: "",
            bookBio: "",
            subjectWorks: {},
            bookNum: 0
        }
        this.fetchAuthorBio = this.fetchAuthorBio.bind(this)
        this.fetchBookBio = this.fetchBookBio.bind(this)
        this.handlePrevClick = this.handlePrevClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
    }

    //The same fetch is performed whenever the component mounts
    //or re-mounts due to a page refresh. The information displayed
    //makes up the site landing page.
    componentDidMount() {
        fetch(`${this.state.baseURL}/works/OL46125W.json`)
            .then(response => response.json())
            .then(response => {
                const title = response.title
                const authURL = response.authors[0].author.key
                const bookDes = response.description
                this.setState({ 
                    bookTitle: title,
                    authorURL: authURL,
                    bookBio: bookDes
                })
            })
        fetch(`${this.state.baseURL}${this.state.authorURL}.json`)
            .then(response => response.json())
            .then(response => {
                const author = response.name
                const biography = response.bio
                this.setState({ 
                    bookAuthor: author,
                    authorBio: biography 
                })
            })
    }
    
    //Both of these fetch functions needed to be written in order
    //to fetch files that contained distinct information from the 
    //initial fetch.
    fetchAuthorBio(bioURL) {
        fetch(bioURL)
            .then(response => response.json())
            .then(response => {
                this.setState({ authorBio: response.bio.value})
                if (typeof this.state.authorBio !== "string") {
                    this.setState({ authorBio: response.bio})
                }
            })
    }

    fetchBookBio(bookURL) {
        fetch(bookURL)
            .then(response => response.json())
            .then(response => {
                this.setState({ bookBio: response.description.value})
                if (typeof this.state.bookBio !== "string") {
                    this.setState({ bookBio: response.description})
                }
            })
    }

    //This lifecycle method will only be called when the user
    //inputs a new book genre or the user clicks the next or 
    //previous buttons.
    componentDidUpdate(prevProps, prevState) {
        if ((this.props.subjectText !== prevProps.subjectText) || (this.state.bookNum !== prevState.bookNum)) {
            fetch(`${this.state.baseURL}/subjects/${this.props.subjectText}.json?limit=20`)
                .then(response => response.json())
                .then(response => {
                    const subGroup = response.works
                    this.setState({ subjectWorks: subGroup })
                    this.setState({ bookTitle: this.state.subjectWorks[this.state.bookNum].title})
                    this.setState({ bookAuthor: this.state.subjectWorks[this.state.bookNum].authors[0].name})
                    this.setState({ authorURL: this.state.subjectWorks[this.state.bookNum].authors[0].key})
                    this.setState({ imgID: this.state.subjectWorks[this.state.bookNum].cover_id})
                    this.setState({ bookBioURL: this.state.subjectWorks[this.state.bookNum].key})
                    this.fetchBookBio(`${this.state.baseURL}${this.state.bookBioURL}.json`)
                    this.fetchAuthorBio(`${this.state.baseURL}${this.state.authorURL}.json`)
                    this.setState({ bookImg: `https://covers.openlibrary.org/b/id/${this.state.imgID}-L.jpg`})
                    if (this.state.authorBio === prevState.authorBio) {
                        this.setState({ authorBio: "Author biography cannot be displayed."})
                    }
                    if (this.state.bookBio === prevState.bookBio) {
                        this.setState({ bookBio: "Book descriptiton cannot be displayed."})
                    }
            })
        }
    }

    //Both of the handle click functions are set to not go
    //below zero or above twenty simply due to the limit
    //which was put into the fetch URL above.
    handlePrevClick() {
        if (this.state.bookNum > 0) {
            this.setState(prevState => {
                return {
                    bookNum: prevState.bookNum - 1
                }
            })
        }
    }

    handleNextClick() {
        if (this.state.bookNum < 20) {
            this.setState(prevState => {
                return {
                    bookNum: prevState.bookNum + 1
                }
            })
        }
    }

    refreshPage() {
        window.location.reload()
    }

    render() {
        return (
            <div>
                <BookInfo 
                    image={this.state.bookImg}
                    title={this.state.bookTitle}
                    author={this.state.bookAuthor}
                    bio={this.state.authorBio}
                    des={this.state.bookBio}
                /> 
                <span className="seek-buttons">
                    <button onClick={this.handlePrevClick}>Previous</button>
                    <button onClick={this.refreshPage}>New Search</button>
                    <button onClick={this.handleNextClick}>Next</button>
                </span>
            </div>
        )
    }
}

export default SearchBook