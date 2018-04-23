import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getItemFilters } from '../../redux/modules/items';


const TagFilterField = ({ tags, dispatch, selectedFilter }) => {
    function handleFilter(value) {
        dispatch(getItemFilters(value));
    }
    return (
        <SelectField className="headerFilter" multiple hintText="Filter By Tag" onChange={(event, index, value) => handleFilter(value[0])}>
            { tags.map((tag, index) => (
                <MenuItem
                    key={index}
                    value={tag}
                    primaryText={tag}
                    checked={selectedFilter.indexOf(tag) >= 0}
                />
        ))}
        </SelectField>
    );
};
TagFilterField.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedFilter: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(TagFilterField);
