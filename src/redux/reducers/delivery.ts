import { ActionTypes } from '../actions/types';
import { IDeliveryOrder, IDeliveryState } from './types';

const initialState: IDeliveryState = {
  selectedOrderDirections: null,
  autocomplete: {
    input: '',
    predictions: [],
  },
  orders: [
    {
      selected: false,
      points: {
        origin: {
          address: 'г.Москва, 2-й Балтийский пер., 4',
          coords: [55.80770953557082, 37.52531095550076],
        },
        destination: {
          address: 'г.Москва, Тихорецкий б-р, 8а',
          coords: [55.678938206667205, 37.77161191782462],
        },
      },
    },
    {
      selected: false,
      points: {
        origin: {
          address: 'г.Москва, Братиславская ул., 15к1',
          coords: [55.65937175887864, 37.7597594846569],
        },
        destination: {
          address: 'г.Москва, Рублёвское ш., 68Бс5',
          coords: [55.72958939201032, 37.45307859824036],
        },
      },
    },
  ],
};

export const delivery = (state = initialState, action: ActionTypes): IDeliveryState => {
  switch (action.type) {
    case 'SET_SELECTED_ORDER': {
      return {
        ...state,
        orders: state.orders.map((i, index) => ({ ...i, selected: index === action.payload && !i.selected })),
      };
    }

    case 'SET_EDITED_POINT': {
      const { payload } = action;
      return {
        ...state,
        orders: state.orders.map((i, index) => ({
          ...i,
          points: Object.entries(i.points).reduce(
            (acc, [k, v]) => ({
              ...acc,
              [k as keyof IDeliveryOrder['points']]: {
                ...v,
                edit: payload.index === index && k === payload.point,
              },
            }),
            {} as IDeliveryOrder['points']
          ),
        })),
      };
    }

    case 'RESET_EDITED_POINT': {
      return {
        ...state,
        autocomplete: {
          input: '',
          predictions: [],
        },
        orders: state.orders.map((i) => ({
          ...i,
          points: Object.entries(i.points).reduce(
            (acc, [k, v]) => ({
              ...acc,
              [k as keyof IDeliveryOrder['points']]: {
                ...v,
                edit: false,
              },
            }),
            {} as IDeliveryOrder['points']
          ),
        })),
      };
    }

    case 'SET_POINT_DATA': {
      const { payload } = action;
      return {
        ...state,
        autocomplete: {
          input: '',
          predictions: [],
        },
        orders: state.orders.map((i, index) =>
          index === payload.index
            ? {
                ...i,
                points: Object.entries(i.points).reduce(
                  (acc, [k, v]) => ({
                    ...acc,
                    [k as keyof IDeliveryOrder['points']]: {
                      address: payload.point === k ? payload.address : v.address,
                      coords: payload.point === k ? payload.coords : v.coords,
                    },
                  }),
                  {} as IDeliveryOrder['points']
                ),
              }
            : i
        ),
      };
    }

    case 'SET_SELECTED_ORDER_DIRECTIONS': {
      return {
        ...state,
        selectedOrderDirections: action.payload,
      };
    }

    case 'SET_ADDRESS_INPUT': {
      return {
        ...state,
        autocomplete: { ...state.autocomplete, input: action.payload },
      };
    }

    case 'SET_ADDRESS_SUGGESTS': {
      return {
        ...state,
        autocomplete: { ...state.autocomplete, ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};
