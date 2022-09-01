import { IconComponent, IconComponentProps, UserAvatar } from '@gessa/component-library';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SearchInput, { ISearchInputTypes } from '../SearchBox';
export interface IHeaderComponentProps {
  logoImagePath?: string;
  searchData: ISearchInputTypes;
  userData: any;
  notificationData: IconComponentProps;
  searchdivEvent?: (data?: any) => any;
  notificationClickEvent?: (data?: any) => any;
  headerLogoClickEvent?: (data?: any) => any;
}

export const HeaderComponent = (props: IHeaderComponentProps) => {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e: any) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const notificationClicked = () => {
    props && props.notificationClickEvent && props.notificationClickEvent();
  };

  useEffect(() => {
    // console.log(props);
  }, [props]);

  const theme: any = useTheme();

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '8vh',
        height: '8vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette?.light?.c50,
        borderBottom: `1px solid ${theme.palette?.text?.c100}`,
      }}
    >
      <div
        style={{
          height: '100%',
          justifyContent: 'flex-start',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: theme.palette?.light?.c50,
            height: '22px',
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onClick={() => {
            console.log('headerlogoClickEvent');
            props && props.headerLogoClickEvent && props.headerLogoClickEvent();
          }}
        >
          {props.logoImagePath && <img src={props.logoImagePath} />}
        </div>
      </div>
      <div
        style={{
          width: '30%',
          // height: '100%',
          margin: '12px',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          background: theme.palette?.light?.c50,
        }}
      >
        {props && props.searchData && (
          <SearchInput
            label={props.searchData.label || 'Search'}
            placeholder={props.searchData.placeholder || 'Search'}
            value={props.searchData.value || ''}
            onChange={(e: any) => inputHandler(e)}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onClick={() => {
            console.log('notificationClickEvent');
            notificationClicked();
          }}
        >
          <IconComponent
            name={props.notificationData.name}
            size={props.notificationData.size}
            label={props.notificationData.label}
            color={props.notificationData.color}
          />
        </div>
        <div
          style={{
            // paddingBottom: '18px',

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <UserAvatar text={props.userData.text || ''} />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
