import { Button, Table as AntdTable, AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Dispatch, KeyboardEvent, ReactNode } from 'react';
import {
  getGeocodeByAddress,
  resetEditedPoint,
  setAddressInput,
  setEditedPoint,
  setSelectedOrder,
} from '../../redux/actions/actionCreators';
import { ActionTypes } from '../../redux/actions/types';

type EditedCellType = (content: string, record: IData, index: number) => ReactNode;
type EditedCellCreatorType = (type: 'origin' | 'destination') => EditedCellType;

const { Option } = AutoComplete;
const editedCellCreator: EditedCellCreatorType =
  (type) =>
  (value, { dispatch, edit, autocomplete }, index) => {
    const handleClick = () => {
      dispatch(setEditedPoint({ index, point: type }));
    };

    const handleSearch = (value: string) => {
      dispatch(setAddressInput(value));
    };

    const handleSelect = (value: string) => {
      dispatch(getGeocodeByAddress({ index, point: type, address: value }));
    };

    return edit[type] ? (
      <AutoComplete
        style={{
          width: '100%',
        }}
        onSearch={handleSearch}
        onSelect={handleSelect}
        placeholder="Введите адрес"
      >
        {autocomplete.predictions.map(({ description }) => (
          <Option key={description} value={description}>
            {description}
          </Option>
        ))}
      </AutoComplete>
    ) : (
      <div onClick={handleClick}>{value}</div>
    );
  };

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: EditedCellType;
}

const columns: IColumn[] = [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (_, { dispatch }, index) => <Button onClick={() => dispatch(setSelectedOrder(index))}>Показать</Button>,
  },
  {
    title: 'Адрес загрузки',
    dataIndex: 'origin',
    key: 'origin',
    render: editedCellCreator('origin'),
  },
  {
    title: 'Адрес разгрузки',
    dataIndex: 'destination',
    key: 'destination',
    render: editedCellCreator('destination'),
  },
];

interface IData {
  // id: number;
  selected: boolean;
  origin: string;
  destination: string;
  edit: { origin?: boolean; destination?: boolean };
  dispatch: Dispatch<ActionTypes>;
  autocomplete: google.maps.places.AutocompleteResponse & {
    input: string;
  };
}

export const Table = () => {
  const { orders, autocomplete } = useAppSelector((state) => state.delivery);
  const dispatch = useAppDispatch();

  const getDataSource = (): IData[] =>
    orders.map((i, index): IData & { key: number } => ({
      key: index,
      selected: i.selected,
      origin: i.points.origin.address,
      destination: i.points.destination.address,
      edit: { origin: i.points.origin.edit, destination: i.points.destination.edit },
      dispatch,
      autocomplete,
    }));

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      dispatch(resetEditedPoint());
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <AntdTable
        columns={columns}
        pagination={false}
        dataSource={getDataSource()}
        rowClassName={({ selected }) => (selected ? 'table-row-dark' : 'table-row-light')}
      />
    </div>
  );
};
