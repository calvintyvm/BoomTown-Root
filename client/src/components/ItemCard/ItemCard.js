import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './styles.css';


const style = {
  margin: 12
};

const styleAvatar = {
  borderRadius: 30
};

const ItemCard = props => {
  const item = props.itemsData;

  return (
      <div>
          <Card>
              <CardMedia>
                  <img src={item.imageurl} alt="card" />
              </CardMedia>
              {(window.location.pathname === ('/')) ?
              (<Link to={`/profile/${item.itemowner.id}`}>
                  <CardHeader
                      title={item.itemowner.fullname}
                      subtitle={moment(item.created, 'YYYYMMDD').fromNow()}
                      avatar={
                          <Gravatar email={item.itemowner.email} style={styleAvatar} />
            }
                  />
              </Link>) : <CardHeader
                  title={item.itemowner.fullname}
                  subtitle={moment(item.created, 'YYYYMMDD').fromNow()}
                  avatar={
                      <Gravatar email={item.itemowner.email} style={styleAvatar} />
            }
              />}
              <CardTitle
                  title="Red Academy"
                  subtitle={item.tags.map((subtitleItem, index) => <span key={index}>{(index ? ', ' : '') + subtitleItem}</span>)}
              />
              <CardText>{item.description}</CardText>
              <RaisedButton label="Borrow" style={style} secondary />
          </Card>
      </div>
  );
};

ItemCard.propTypes = {
  itemsData: PropTypes.object.isRequired,

};

export default ItemCard;
