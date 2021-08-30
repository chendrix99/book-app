import React from "react"
import "../index.css"

class BookInfo extends React.Component {

    render() {
        return (
            <div className="book">
                    <div>
                        <img src={this.props.image} className="book-img" alt="Failed to Load" />
                    </div>
                    <div className="book-info">
                        <h2>{this.props.title}</h2>
                        <h2>{this.props.author}</h2>
                        <section>
                            <h3>Description:</h3>
                            <p>{this.props.des}</p>
                            <h3>Author biography:</h3>
                            <p>{this.props.bio}</p>
                        </section>
                    </div>
            </div>
        )
    }
}

export default BookInfo 