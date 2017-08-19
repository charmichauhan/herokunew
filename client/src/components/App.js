import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header';
import Landing from './landing';
import Payments from './Payments';
import {connect} from 'react-redux';
import * as actions from '../actions';

const DashBoard =() => <h2> DashBoard </h2>
const SurveyNew =() => <h2> SurveyNew </h2>

class App extends Component{

    componentDidMount(){
            this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={DashBoard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                        <Route path="/payments" component={Payments}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default connect(null, actions)(App);