import { MOODS } from '../GlobalConfig';


export default function createMoodsReducer(reducer, initialState) {
  const reducers = Object
    .keys(MOODS)
    .reduce((acc, curr) => {
      acc[curr] = (state = initialState, action) => {
        if (!action || !action.payload || action.payload.mood !== curr) {
          return state;
        }

        return reducer(state, action);
      };

      return acc;
    }, {});

  return reducers;
}
