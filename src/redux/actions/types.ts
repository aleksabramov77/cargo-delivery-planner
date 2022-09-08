import * as actions from './actionCreators';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;
