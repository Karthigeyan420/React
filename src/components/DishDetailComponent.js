import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }
    renderDish(dish) {
        if (dish != null)
            return(

                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

            );
        else
            return(
                <div></div>
            );
    }
    formatDate(date="")
    {
            var monthNames = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
            ];
          date=new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ',' + year;
    }
    renderComments(dish)
    {
        if(null==dish)
        {
            return(
                <div></div>
            );
        }

        console.log(dish.comments);
        const commentsItems = dish.comments.map((cmt) =>

                 <li key = { cmt.id }>
                 <p>{cmt.comment}</p>

                 <p>-- {cmt.author},{this.formatDate(cmt.date)}</p>

                 </li> 

            );
        return(
            <div>
                <h2>Comment</h2>
            <ul key = { dish.id }>{commentsItems}</ul>
            </div>
        )
    }
    render()
    {
        return (
         <div className="container">
          <div className="row">
              <div  className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.selected_dish)}
              </div>
              <div  className="col-12 col-md-5 m-1">
                {this.renderComments(this.props.selected_dish)}
              </div>
            </div>
            </div>
        )
    }
}
    export default DishDetail; 