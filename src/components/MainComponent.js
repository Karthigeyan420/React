import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addcomment, fetchDishes } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) =>({
  addcomment: (dishId, rating, author, comment) => dispatch(addcomment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const dishWithID = ({match}) => {
        return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                isLoading = {this.props.dishes.isLoading}
                errMess = {this.props.dishes.errMess}
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
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
            <Redirect to='/home'/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); 