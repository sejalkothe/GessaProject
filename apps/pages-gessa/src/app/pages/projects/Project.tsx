import React, { useMemo, lazy, useEffect, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import Header from './component/Header/Header';
import { IconComponent } from '@gessa/component-library';
import {
  Link,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ITheme } from '../../../theme/index';
// import Logo from '../../../assets/logo.svg';
import ChildMenuContext from './component/ChildMenusContext';
import {
  getAppMenu,
  selectAllMenu,
} from '../../pages/projects/store/appMenuSlice';
import { useAppDispatch } from '../../../context/redux';
import { useLocation } from 'react-router-dom';
import { HeaderComponent } from '@gessa/component-library';
import AppLayout from '../../layouts/AppLayout';
import {
  getLocalStorage,
  setLocalStorage,
} from 'apps/pages-gessa/src/utils/localStorageService';

function Project() {
  const params: any = useParams();
  const theme: ITheme = useTheme();
  const [widgetData, setWidgetData] = useState([]);
  const [appMenu, setAppMenu]: any = useState();
  const [isClicked, setClicked]: any = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(params.menuId || '');
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const _userInfo = getLocalStorage('userInfo');

  useEffect(() => {
    if (params && params.projectId) {
      const userInfo = {
        ..._userInfo,
        ...{ projectId: params.projectId },
      };
      setLocalStorage('userInfo', userInfo);
    }
  }, [params]);
  const location = useLocation();
  const headerComponentProps = {
    logoImagePath:
      'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/Logo.svg',
    searchData: {
      label: 'Search',
      placeholder: 'Search',
      value: '',
    },
    notificationData: {
      name: 'Notification_24dp',
      size: 55,
      color: '#ff00ff',
      label: 'notification',
    },

    userData: {
      text: _userInfo.userName,
    },
  };

  useEffect(() => {
    const menuParams = {
      page: 0,
      size: 100,
    };
    dispatch(getAppMenu(menuParams))
      .then((res: any) => {
        const parents: any = {};
        const createParent = (id: string, item: any) => {
          parents[id] = {
            child: [],
            data: { ...item },
          };
        };
        res?.payload.forEach((item: any) => {
          const parentId = item?.parentId || '';
          if (parentId === '') {
            if (!parents[parentId]) {
              createParent(item._id, item);
            }
          } else if (item.parentId) {
            if (parents[parentId]) {
              parents[parentId].child.push(item);
            } else {
              createParent(parentId, item);
            }
          }
        });
        const arrPar = [];
        for (const key in parents) {
          arrPar.push(parents[key]);
        }
        setAppMenu(arrPar);
      })
      .catch((reason: any) => {
        //  Todod :
      });
  }, []);

  const urlParams = useParams();
  const menuName: any = useMemo(() => {
    let menuChild: any[] = [];
    const menu = urlParams['*']?.split('/')?.[1];
    // console.log('aaa', params);
    if (selectedMenu) {
      appMenu?.forEach((item: any, index: any) => {
        if (
          item.data.name === selectedMenu ||
          item.data.name === params.menuId
        ) {
          menuChild = item.child;
        }
      });
    }
    return { menu, menuChild };
  }, [appMenu, urlParams, params]);

  useEffect(() => {}, [appMenu]);

  return (
    <Box
      sx={{
        background: theme.palette?.background?.default,
        overflow: 'hidden !important',
      }}
    >
      <HeaderComponent {...headerComponentProps} />
      {/* <Header {...headerComponentProps} /> */}
      <Stack direction="row">
        <Box
          sx={{
            width: '62px',
            height: '92vh',
            justifyContent: 'center',
            display: 'flex',
            background: theme.palette?.light?.c50,
            borderRight: `1px solid ${theme.palette?.text?.c100}`,
          }}
        >
          <Stack direction="column">
            {appMenu?.map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  to={`/project/${params.projectId}/${
                    item.data.name || params.menuId
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '10px',
                      background:
                        selectedMenu === item.data.name
                          ? theme?.palette?.background?.default
                          : theme?.palette?.light?.c50,
                    }}
                    onClick={() => {
                      setClicked(isClicked !== index ? index : -1);
                      setSelectedMenu(item.data.name);
                    }}
                  >
                    <IconComponent
                      name={item.data.icon}
                      size={25}
                      label={item.data.icon}
                      color={
                        selectedMenu === item.data.name
                          ? theme?.palette?.primary?.main
                          : theme?.palette?.text?.primary
                      }
                    />
                  </Box>
                </Link>
              );
            })}
          </Stack>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          <ChildMenuContext.Provider value={menuName.menuChild}>
            <AppLayout />
          </ChildMenuContext.Provider>
        </Box>
      </Stack>
    </Box>
  );
}

export default Project;
