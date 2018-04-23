const GET_PROFILE = 'GET_PROFILE';
const GET_IS_LOADING = 'GET_IS_LOADING';
const GET_ERROR = 'GET_ERROR';

export const getProfile = profile => ({
    type: GET_PROFILE,
    payload: profile
});

export const getIsLoading = () => ({
  type: GET_IS_LOADING,
});

export const getError = (isError) => ({
  type: GET_ERROR,
  payload: isError
});


const initialState = {
    profile: [],
    error: '',
    isLoading: false,
};

const filterProfile = (items, profile) => items.filter(item => item.itemowner.id === profile);


// thunk
export const fetchProfileFromUrl = (userid) => dispatch => {
  const urls = ['http://localhost:3000/items', 'http://localhost:3000/users'];

  const combineItemsAndUsers = itemsAndUsers => {
    itemsAndUsers[0].forEach(item => {
      itemsAndUsers[1].forEach(user => {
                if (user.id === item.itemowner) {
                  item.itemowner = user;
                }
      });
    });
    return itemsAndUsers[0];
    };

dispatch(getIsLoading());
Promise.all(urls.map(url => fetch(url)
.then(resp => resp.json())))
.then(responses => dispatch(getProfile(filterProfile(combineItemsAndUsers(responses), userid))))
.catch(error => dispatch(getError(error)));
};


export default (state = initialState, action) => {
      switch (action.type) {
        case GET_IS_LOADING: {
          return { ...state, isLoading: true, error: '' };
        }
          case GET_PROFILE: {
            const profile = action.payload;
            return { ...state, isLoading: false, error: '', profile };
          }
          case GET_ERROR: {
            return { ...state, isLoading: false, error: action.payload };
          }

          default: {
            return {
              ...state
            };
          }
        }
      };

