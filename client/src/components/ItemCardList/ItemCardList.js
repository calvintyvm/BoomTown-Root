import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import ItemCard from '../../components/ItemCard';


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
    <Masonry
        elementType={'ul'}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad
        style={styles}
    >
        {props.itemsData.map((item, index) => (
            <li key={index}>
                <ItemCard itemsData={item} />
            </li>
      ))}
    </Masonry>
  );

export default ItemCardList;

ItemCard.propTypes = {
  itemsData: PropTypes.object.isRequired,
};
