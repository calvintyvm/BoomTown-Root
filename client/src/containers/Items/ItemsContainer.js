import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Items from './Items';
import './styles.css';
import { fetchItemsFromUrl } from '../../redux/modules/items';
class ItemsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchItemsFromUrl());
  }

  filterItems = itemsData => {
    if (itemsData.itemFilters.length > 0) {
      const filteredItems = itemsData.items.filter(item => item.tags.filter(tag =>
        itemsData.itemFilters.find(filter => filter === tag)).length);
      return filteredItems;
    }
    return itemsData.items;
  };

  render() {

    return (
        <div>
            {
            (this.props.itemsData.isLoading) ? (
                <CircularProgress className="loadingIcon" thickness={7} />) :
            (<Items itemsData={this.filterItems(this.props.itemsData)} />
            )}

        </div>
    );
  }
}


export default connect(state => ({
    itemsData: state.itemsData
  }))(ItemsContainer);

  ItemsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemsData: PropTypes.shape({
      isLoading: PropTypes.bool,
      items: PropTypes.array,
      dispatch: PropTypes.func
    }).isRequired
  };