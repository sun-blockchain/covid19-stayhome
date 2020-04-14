import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from '../../actions/UI';
import './case.css';
import Papa from 'papaparse';
import request from 'request';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

function Case() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const refSearchInput = useRef('');

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={refSearchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      //if record[dataIndex] not null
      if (record[dataIndex]) {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => refSearchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: 'Province_State',
      dataIndex: 'Province_State',
      key: 'Province_State',
      width: '20%',
      ...getColumnSearchProps('Province_State')
    },
    {
      title: 'Country_Region',
      dataIndex: 'Country_Region',
      key: 'Country_Region',
      width: '20%',
      ...getColumnSearchProps('Country_Region')
    },
    {
      title: 'Confirmed',
      dataIndex: 'Confirmed',
      key: 'Confirmed'
    },
    {
      title: 'Deaths',
      dataIndex: 'Deaths',
      key: 'Deaths'
    },
    {
      title: 'Recovered',
      dataIndex: 'Recovered',
      key: 'Recovered'
    },
    {
      title: 'Active',
      dataIndex: 'Active',
      key: 'Active'
    }
  ];

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    request(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${mm}-${dd -
        1}-${yyyy}.csv`,
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var csv = body;

          Papa.parse(csv, {
            header: true,
            delimiter: ',',
            complete: function(results) {
              setData(results.data);
            }
          });
        }
      }
    );

    dispatch(UI.updateMenuKey(3));
  }, [dispatch]);

  return (
    <div className='site-layout-title'>
      Case
      <Table columns={columns} dataSource={data} size='small' />
    </div>
  );
}

export default Case;
