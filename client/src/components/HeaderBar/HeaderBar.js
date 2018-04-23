import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';
import TagFilterField from '../TagFilterField';
import { fetchItemsFromUrl } from '../../redux/modules/items';


const icon = (
    <Link to="/">
        <img src={logo} alt="logo" />
    </Link>
);

class HeaderBar extends Component {
  componentDidMount() {
    const urls = ['http://localhost:3000/items", "http:://localhost:3000/users'];
    this.props.dispatch(fetchItemsFromUrl(urls));
  }

  getTags = items => {
    const tags = [];
    if (items.length && items[0] !== undefined) {
      items.forEach(item => {
        if (item.tags !== undefined) {
          if (!item.tags.includes(undefined)) {
            item.tags.forEach(tag => {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            });
          }
        }
      });
    }
    return tags;
  };


  render() {
    const tags = this.getTags(this.props.items.items);
    return (<AppBar
        className="Header"
        iconElementLeft={icon}
    >
        { (window.location.pathname === ('/')) ? (<TagFilterField className="filterHeader"tags={tags} selectedFilter={this.props.items.itemFilters} />) : null }
        <div>
            <RaisedButton primary className="profileButton" label="My Profile" />
            <RaisedButton secondary label="Logout" />
        </div> </AppBar>);
}
}
export default connect(state => ({
  items: state.itemsData
  }))(HeaderBar);


  HeaderBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.shape({
      items: PropTypes.array,
      itemFilters: PropTypes.array,
    }).isRequired
  };
