import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from  'react-router-dom';
import Payments from './Payments';

class Header extends Component{

    renderContent(){
        switch (this.props.auth){

            case null:
                return ;

                //To login, display below
            case false:
                return <li><a href="/auth/google">Login in with Google</a></li>;

                //user when clicks on 'login with google' it goes to '/survey' and display below
            default:
                return [
                 <li key="1"><Payments/></li>,
                 <li key="2" style={{margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
                 <li key="3"><a href="/api/logout">Logout</a></li>
            ];

           // default: return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render(){
    return(
  <nav>
      <div className="nav-wrapper">
          <Link to={this.props.auth ?  '/surveys' : '/'  } className="left brand-logo"> Emaily </Link>

          <ul className="right">
              {this.renderContent()}
          </ul>
      </div>
  </nav>
    )
    }
}

function mapStateToProps({auth}) {
    return {auth }
}

export default connect(mapStateToProps)(Header);