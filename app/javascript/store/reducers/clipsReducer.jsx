import {extend, concat} from 'lodash';

export default function reducer(state = {
  collection: []
}, action) {
  switch (action.type) {
    case "CREATE_CLIP_FULFILLED": {
      const extendedCollection = concat(state.collection, action.clip);
      return extend({}, state, {collection: extendedCollection});
    }
  }
  return state;
}
