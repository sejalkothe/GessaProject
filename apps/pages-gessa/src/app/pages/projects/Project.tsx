import React, { useMemo, lazy, useEffect, useState, memo } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import Header from './component/Header/Header';
import { IconComponent } from '@gessa/component-library';
import {
  Link,
  Route,
  Routes,
  useNavigate,
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
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from 'apps/pages-gessa/src/utils/localStorageService';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './SideNav';
import {
  selectActiveMenuName,
  selectAllSortedMenuById,
} from './store/sortedMenuSlice';
import { IRootState } from 'apps/pages-gessa/src/store';
import keycloak from 'apps/pages-gessa/src/keycloak/keycloak';

export function Project() {
  const params: any = useParams();
  const theme: ITheme = useTheme();
  const rootState = useSelector((state: IRootState) => state);

  const [widgetData, setWidgetData] = useState([]);
  const sortedMenus = selectAllSortedMenuById(rootState) || [];

  const [appMenu, setAppMenu]: any = useState();
  const [isClicked, setClicked]: any = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(params.menuId || '');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const _userInfo = getLocalStorage('userInfo');
  const [sortedData, setSortedData] = useState<any>([]);
  const _selectedMenuName = selectActiveMenuName(rootState);
  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setSortedData(sortedMenus[0].data);
    }
  }, [sortedMenus]);

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
      size: 25,
      label: 'notification',
    },

    userData: {
      text: _userInfo.userName,
    },
  };

  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
    } else {
      const menuParams = {
        page: 0,
        size: 100,
      };
      dispatch(getAppMenu(menuParams))
        .then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const sortedArr = JSON.parse(JSON.stringify(res.payload.data));
            if (sortedArr && sortedArr[0].data) {
              if (sortedArr[0].child && sortedArr[0].child.length > 0) {
                navigate(
                  `/project/${params.projectId}/${
                    params.menuId || sortedArr[0].data.name
                  }/${params.subMenuId || sortedArr[0].child[0].name}`
                );
              } else {
                navigate(
                  `/project/${params.projectId}/${
                    params.menuId || sortedArr[0].data.name
                  }`
                );
              }
            }
          }
          // setSelectedMenu('page2');
        })
        .catch((reason: any) => {
          //  Todod :
        });
    }
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

  const logoutUser = (data?: any): any => {
    clearLocalStorage();
    keycloak.logout();
  };

  return (
    <Box
      sx={{
        background: theme.palette?.light?.c50,
        overflow: 'hidden !important',
      }}
    >
      <HeaderComponent
        logoImagePath={headerComponentProps.logoImagePath}
        searchData={headerComponentProps.searchData}
        notificationData={headerComponentProps.notificationData}
        userData={headerComponentProps.userData}
        logoutClickAction={(e: any) => {
          logoutUser(e);
        }}
      />
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
            <SideNav
              menuList={sortedData}
              selectedMenuName={selectedMenu}
              setSelectedMenuName={(data: any) => {
                setSelectedMenu(data);
              }}
            />
            {/* {appMenu?.map((item: any, index: any) => {
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
            })} */}
          </Stack>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          {/* <ChildMenuContext.Provider value={menuName.menuChild}> */}
          <AppLayout />
          {/* </ChildMenuContext.Provider> */}
        </Box>
      </Stack>
    </Box>
  );
}

export default memo(Project);
