import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Items from './Items';
import './styles.css';
import { fetchItemsFromUrl } from '../../redux/modules/items';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const fetchItems = gql`
  query{
    items{
      id
      title
      description
      imageurl
      tags
      itemowner{
        id
        fullname
        email
      }
      created
      available
      borrower{
        id 
        fullname
        email
      }
    }
  }
`;


class ItemsContainer extends Component {
  // filterItems = itemsData => {
  //   if (itemsData.itemFilters.length > 0) {
  //     const filteredItems = itemsData.items.filter(item => item.tags.filter(tag =>
  //       itemsData.itemFilters.find(filter => filter === tag)).length);
  //     return filteredItems;
  //   }
  //   return itemsData.items;
  // };


  render() {
    return (<Query query={fetchItems}>
        {
      ({ loading, error, data }) => {
        if (loading) return  <CircularProgress className="loadingIcon" thickness={7} />;
        if (error) return <p>Error getting items</p>;
        return <Items itemsData={data.items} />;
      }
    }
    </Query>
    );
}
}
export default ItemsContainer;
// export default graphql(fetchItems)(ItemsContainer);


  // ItemsContainer.propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  //   itemsData: PropTypes.shape({
  //     isLoading: PropTypes.bool,
  //     items: PropTypes.array,
  //     dispatch: PropTypes.func
  //   }).isRequired
  // };