import React from 'react';
//ANTD Design elements Imports
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export const Side_collapsable_menu = ({ isVisible, toggleMenu }) => {
  const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
    { type: 'divider' },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' },
      ],
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        { key: '13', label: 'Option 13' },
        { key: '14', label: 'Option 14' },
      ],
    },
  ];

  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all ease-in-out duration-300 transform ${isVisible ? 'w-64' : 'w-0'} bg-white border-r border-gray-300 overflow-hidden z-50`}
    >
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <span className="font-semibold text-lg">Menu</span>
        <button
          className="text-gray-600 hover:text-black focus:outline-none"
          onClick={toggleMenu}
        >
          ✖
        </button>
      </div>
      <Menu
        onClick={onClick}
        style={{ width: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};
