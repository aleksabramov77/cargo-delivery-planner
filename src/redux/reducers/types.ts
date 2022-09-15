interface IAddress {
  address: string;
  coords: [number, number];
  edit?: boolean;
}

export interface IDeliveryOrder {
  selected: boolean;
  points: {
    origin: IAddress;
    destination: IAddress;
  };
}

export interface IDeliveryState {
  selectedOrderDirections: google.maps.DirectionsResult | null;
  autocomplete: google.maps.places.AutocompleteResponse & {
    input: string;
  };
  orders: IDeliveryOrder[];
}

interface ISuggestSubstring {
  length: number;
  offset: number;
}

interface ISuggestTerm {
  offset: number;
  value: string;
}

export interface ISuggest {
  description: string;
  matched_substrings: ISuggestSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: ISuggestSubstring[];
    secondary_text: string;
  };
  terms: ISuggestTerm[];
  types: string[];
}
