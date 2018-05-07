import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Profile from './Profile';
import ItemCardList from '../../components/ItemCardList';
// import { fetchProfileFromUrl } from '../../redux/modules/profile';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const fetchItemsProfile = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            email
            fullname
            bio
            borroweditems {
                id
            }
            owneditems {
                title
                description
                imageurl
                tags
                created
                available
                itemowner {
                    id
                    fullname
                    email
                }
            }
        }
    }
`;
class ProfileContainer extends Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <Query query={fetchItemsProfile} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <CircularProgress
                                className="loadingIcon"
                                thickness={7}
                            />
                        );
                    }
                    if (error) return <p>Error getting items</p>;
                    return (
                        <div>
                            {console.log(data.user.owneditems)}
                            <Profile profileData={data.user} />
                            <ItemCardList
                                itemsData={data.user.owneditems}
                                itemFilters={[]}
                            />
                        </div>
                    );
                }}
            </Query>
        );
    }
}
export default ProfileContainer;

// ProfileContainer.propTypes = {
//   match: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   profile: PropTypes.shape({
//     profile: PropTypes.array,
//     isLoading: PropTypes.boolean
//   }).isRequired
// };
