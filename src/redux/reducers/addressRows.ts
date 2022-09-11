import { ActionTypes } from '../actions/types';

// const initialState = [
//   {
//     adress: '1',
//     key: '1',
//   }  '2',
//   '3',
//   '4',
//   '5',
//   // 'г.Москва, ул. Часовая, д.19',
//   // 'г.Москва, ул. Смольнаа, д.1',
//   // 'г.Москва, пр-т Мира, д.100',
//   // 'г.Москва, ул. Люблинская, д.10',
//   // 'г.Москва, пр-т Маршала Жукова,, д.52',
// ];
//
// export const addressRows = (state = initialState, action: ActionTypes): typeof initialState => {
//   switch (action.type) {
//     case SET_ADDRESSES: {
//       return {
//         ...state,
//         addresses: action.payload,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

const initialState = {
  addresses: [
    '1',
    '2',
    '3',
    '4',
    '5',
    // 'г.Москва, ул. Часовая, д.19',
    // 'г.Москва, ул. Смольнаа, д.1',
    // 'г.Москва, пр-т Мира, д.100',
    // 'г.Москва, ул. Люблинская, д.10',
    // 'г.Москва, пр-т Маршала Жукова,, д.52',
  ],
};

export const addressRows = (state = initialState, action: ActionTypes): typeof initialState => {
  switch (action.type) {
    case 'SET_ADDRESSES': {
      return {
        ...state,
        addresses: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
