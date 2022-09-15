import { RootState } from '../store';
import { IDeliveryOrder } from '../reducers/types';

export const getOrder = (store: RootState): IDeliveryOrder | undefined => store.delivery.orders.find((i) => i.selected);

export const getAutocompleteInput = (store: RootState): string => store.delivery.autocomplete.input;
