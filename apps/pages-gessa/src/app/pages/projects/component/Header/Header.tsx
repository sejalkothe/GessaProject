import { Stack, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// import './header-component.css';
import { Divider, Popover, Typography } from '@mui/material';
import {
  IconComponent,
  IconComponentProps,
  UserAvatar,
} from '@gessa/component-library';
import SearchInput, { ISearchInputTypes } from '../SearchBox';
import themes from 'apps/pages-gessa/src/theme';
interface IAnyProps {
  [key: string]: string | number | any;
}
export interface IHeaderComponentProps {
  logoImagePath?: string;
  searchData: ISearchInputTypes;
  headerBackgroundColor?: string;
  userData: any;
  notificationData: IconComponentProps;
  chartProps?: IAnyProps;
  searchdivEvent?: (data?: any) => any;
  notificationClickEvent?: (data?: any) => any;
  headerLogoClickEvent?: (data?: any) => any;
  logoutClickAction?: (data?: any) => any;
}

export const HeaderComponent = (props: IHeaderComponentProps) => {
  const [inputText, setInputText] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = useState<any>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  const inputHandler = (e: any) => {
    // const lowerCase = e.target.value.toLowerCase();
    // setInputText(lowerCase);
  };

  const notificationClicked = () => {
    props.notificationClickEvent && props.notificationClickEvent();
  };

  useEffect(() => {
    // console.log(props);
  }, [props]);

  const theme = themes.default;

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
        background:
          props.headerBackgroundColor ||
          themes.default?.palette?.background?.bacopWhite,
        borderBottom: `1px solid ${theme.palette?.neutral?.neu100}`,
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
            background: themes.default?.palette?.background?.bacopWhite,
            height: '22px',
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onClick={() => {
            console.log('headerlogoClickEvent');
            props.headerLogoClickEvent && props.headerLogoClickEvent();
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
          backgroundColor: themes.default?.palette?.background?.bacopWhite,
        }}
      >
        {props && props.searchData && (
          <SearchInput
            label={props.searchData.label || 'Search'}
            placeholder={props.searchData.placeholder || 'Search'}
            value={props.searchData.value || ''}
            chartProps={props.chartProps}
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
          onClick={(e: any) => handleClick(e)}
        >
          <UserAvatar text={props.userData.text || ''} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{
              background: themes.default?.palette?.background?.bacopWhite,
              backgroundColor: themes.default?.palette?.background?.bacopWhite,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '274px',
                height: '137px',
                backgroundColor:
                  themes.default?.palette?.background?.bacopWhite,
              }}
            >
              {/* Inner User Content */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor:
                    themes.default?.palette?.background?.bacopWhite,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '14px',
                  width: '205px',
                  marginTop: '16px',
                  marginLeft: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '47px',
                    height: '47px',
                    background: themes.default?.palette?.background?.bacopWhite,
                    borderRadius: '50%',
                  }}
                >
                  <CameraAltIcon />
                </div>
                <Stack direction={'column'} spacing={-0.5}>
                  <Typography
                    sx={{
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontSize: '16px',
                      color: theme.palette?.text?.tex300Main,
                    }}
                  >
                    {props.userData?.text || ''}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '14px',
                      color: theme.palette?.text?.tex300Main,
                    }}
                  >
                    {props.userData?.email || ''}
                  </Typography>
                </Stack>
              </div>
              <Divider
                sx={{
                  width: '100%',
                  borderWidth: '1px',
                  marginTop: '22px',
                  marginBottom: '16px',
                  backgroundColor:
                    themes.default?.palette?.background?.bacopWhite,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '18px',
                  alignItems: 'center',
                }}
                onClick={() =>
                  props.logoutClickAction && props.logoutClickAction()
                }
              >
                <IconComponent
                  name={'logout_black_24dp'}
                  size={30}
                  label={' '}
                  color={theme.palette?.text?.tex300Main}
                />
                <Typography
                  variant={'caption'}
                  sx={{
                    fontWeight: '600',
                    cursor: 'pointer',
                    color: theme.palette?.text?.tex300Main,
                  }}
                >
                  Log Out
                </Typography>
              </div>
            </div>{' '}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
