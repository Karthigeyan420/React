import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addcomment } from '../redux/ActionCreators';

const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) =>({
  addcomment: (dishId, rating, author, comment) => dispatch(addcomment(dishId, rating, author, comment))
})

class Main extends Component {

  constructor(props) {
    super(props);

  }



  render() {

    const HomePage = () => {return (<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
    leader={this.props.leaders.filter((leader) => leader.featured)[0]} />)}

    const dishWithID = ({match}) => {
        return (
            <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                addcomment={this.props.addcomment}
            />
        );
    }


    return (
      <div>
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leader={this.props.leaders} />} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>} />
            <Route path='/menu/:dishId' component={dishWithID} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to='/home'/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); 