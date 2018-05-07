import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import ItemCard from '../../components/ItemCard';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// ask about left
const styles = {
    width: '100vw',
    left: '7.5%'
};

const masonryOptions = {
    horizontalOrder: true,
    columnWidth: 350,
    gutter: 20
};

const ItemCardList = props => (
    <div>
        <Masonry
            elementType={'ul'}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad
            style={styles}
        >
            {props.itemFilters.length !== 0
                ? props.itemFilters.map(filter => {
                    const filteredItems = props.itemsData.filter(item =>
                        item.tags.includes(filter)
                    );
                    return filteredItems.map((item, index) => (
                        <li key={index} className={'grid-item'}>
                            <ItemCard itemsData={item} />
                        </li>
                    ));
                })
                : props.itemsData.map((item, index) => (
                    <li key={index} className={'grid-item'}>
                        <ItemCard itemsData={item} />
                    </li>
                ))}
        </Masonry>
        <Link to="/share">
            <FloatingActionButton
                secondary
                style={{ position: 'fixed', bottom: '15px', right: '15px' }}
            >
                <ContentAdd />
            </FloatingActionButton>
        </Link>
    </div>
);

export default ItemCardList;

ItemCard.propTypes = {
    itemsData: PropTypes.object.isRequired
};
