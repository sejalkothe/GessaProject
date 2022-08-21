import React, { useMemo, lazy, useEffect, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import Header from './component/Header/Header';
import { IconComponent } from '@iauro/soulify';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { routes } from '../../layout/route';
import LayoutWrapper from '../../layout/layout';
import { ITheme } from '../../../theme/index';
import Logo from '../../../assets/logo.svg';
import ChildMenuContext from './component/ChildMenusContext';
import {
  getAppMenu,
  selectAllMenu,
} from '../../pages/projects/store/appMenuSlice';
import { useAppDispatch } from '../../../context/redux';
import { useLocation } from 'react-router-dom';

function Project() {
  const theme: ITheme = useTheme();
  const [widgetData, setWidgetData] = useState([]);
  const [appMenu, setAppMenu]: any = useState();
  const [isClicked, setClicked]: any = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3004/widget')
      .then((respone) => {
        const result = respone.json();
        return result;
      })
      .then((res) => {
        setWidgetData(res);
      })
      .catch((error) => {
        //  ToDo:
      });
  }, []);

  useEffect(() => {
    dispatch(getAppMenu({ page: 0, size: 8 }))
      .then((res) => {
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
    appMenu?.forEach((item: any, index: any) => {
      if (item.data.name === menu) {
        menuChild = item.child;
      }
    });

    return { menu, menuChild };
  }, [appMenu, urlParams]);

  return (
    <Box
      sx={{
        background: theme.palette?.background?.default,
      }}
    >
      <Header title="iauro" searchBar="true" logo={Logo} />
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
                  to={'menu/' + item.data.name + '/'}
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
                        menuName.menu === item.data.name
                          ? theme?.palette?.background?.default
                          : theme?.palette?.light?.c50,
                    }}
                    onClick={() => {
                      setClicked(isClicked !== index ? index : -1);
                    }}
                  >
                    <IconComponent
                      name={item.data.icon}
                      size={25}
                      label={'Quilt'}
                      color={
                        menuName.menu === item.data.name
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
          }}
        >
          <ChildMenuContext.Provider value={menuName.menuChild}>
            <LayoutWrapper />
          </ChildMenuContext.Provider>
        </Box>
      </Stack>
    </Box>
  );
}

export default Project;
