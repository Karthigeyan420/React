import React, { Component } from "react";
import { Media } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  handleCommentSubmit(values) {
    this.toggleModal();
    console.log("Current State is: " + JSON.stringify(values));
    //event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;
    return (
      <div>
        <div className="row">
          <Button
            type="submit"
            onClick={this.toggleModal}
            className="btn btn-outline-secondary"
          >
            <span className="fa fa-pencil fa-lg" /> Submit Comment
          </Button>
        </div>
        <div className="row">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
              <div className="col-12">
                <h4>Submit Comment</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={12}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comment" md={12}>
                      Comment
                    </Label>
                    <Col md={10}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="6"
                        className="form-control"
                      />
                    </Col>
                </Row>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else return <div />;
}
function FormatDate({date = ""}) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  date = new Date(date);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + "," + year;
}
function RenderComments({ comments, addComment, dishId }) {
  if (null == comments) {
    return <div />;
  }

  console.log(comments);
  const commentsItems = comments.map((cmt )=> {
    console.log(cmt)
    return(
    <li key={cmt.id}>
      <p>{cmt.comment}</p>

      <p>
        -- {cmt.author} ,<FormatDate date={cmt.date} />
      </p>
    </li>
  )});
  return (
    <div>
      <h2>Comment</h2>
      <ul key={comments.id}>{commentsItems}</ul>
      <CommentForm dishId={dishId} addComment={addComment}/>
    </div>
  );
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;