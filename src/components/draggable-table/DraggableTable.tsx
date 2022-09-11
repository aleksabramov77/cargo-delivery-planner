import { useCallback, useEffect } from 'react';
import { Table } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import './index.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAddresses } from '../../redux/actions/actionCreators';
import * as React from 'react';

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

const columns: IColumn[] = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
];

interface IData {
  title: JSX.Element;
  address: string;
  key: string;
}

const getIndexInParent = (el?: Element | null): number => (el ? Array.from(el.parentNode!.children).indexOf(el) : 0);

export const DraggableTable = () => {
  const { addresses } = useAppSelector((state) => state.addressRows);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState(addresses);

  const getTableRows = (): IData[] => {
    return data.map((address) => ({
      title: <DragOutlined className="draggable" type="swap" />,
      address,
      key: address,
    }));
  };

  const handleReorder = (dragIndex: number, draggedIndex: number) => {
    setData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      dispatch(setAddresses(newState));
      return newState;
    });
  };

  useEffect(() => {
    let start: number = 0;
    let end: number;

    const container = document.querySelector('.ant-table-tbody');

    if (container) {
      const drake = dragula([container], {
        moves: (el) => {
          start = getIndexInParent(el);
          return true;
        },
      });

      drake.on('drop', (el) => {
        end = getIndexInParent(el);
        handleReorder(start, end);
      });
    }
  }, []);

  return <Table columns={columns} pagination={false} dataSource={getTableRows()} />;
};
