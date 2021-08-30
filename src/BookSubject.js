import React from "react" 
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import SearchSubject from "./Components/SearchSubject"
import "./index.css"

class BookSubject extends React.Component {
    
    
    render() {
        return (
            <div className="body">
                <Header />
                <SearchSubject />
                <Footer />
            </div>
        )
    }
}

export default BookSubject