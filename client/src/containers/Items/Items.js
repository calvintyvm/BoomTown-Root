import React from 'react';
import PropTypes from 'prop-types';

import ItemCardList from '../../components/ItemCardList';

const Items = props => (
    <div>
        <ItemCardList
            itemsData={props.itemsData}
            itemFilters={props.itemFilters}
        />
    </div>
);

export default Items;

Items.propTypes = {
    itemsData: PropTypes.array.isRequired
};
