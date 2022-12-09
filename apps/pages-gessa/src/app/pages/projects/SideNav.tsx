import { IconComponent } from '@gessa/component-library';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import { IRootState } from 'apps/pages-gessa/src/store';
import generateRandomString from 'apps/pages-gessa/src/utils/randomString';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  selectAllSortedMenuById,
  setActiveMenuName,
  setPageId,
} from './store/sortedMenuSlice';

export interface ISideNav {
  menuList: any;
  selectedMenuName: string;
  setSelectedMenuName: (data: any) => any;
}
const SideNav = (props: ISideNav) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const [appMenu, setAppMenu]: any = useState<Array<any>>([]);
  const [isClicked, setClicked]: any = useState(false);
  const sortedMenus = selectAllSortedMenuById(rootState);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    params.menuId || props.selectedMenuName
  );

  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setAppMenu(sortedMenus[0].data);
    }
  }, [sortedMenus]);

  // useEffect(() => {
  //   if (params && params.menuId) {
  //     dispatch(setActiveMenuName(params.menuId));
  //   }
  // }, [params]);

  return (
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
        {appMenu &&
          appMenu.length > 0 &&
          appMenu.map((item: any, index: any) => {
            return (
              // <Link
              //   key={index}
              //   to={`/project/${params.projectId}/${
              //     item.data.name || params.menuId
              //   }`}
              //   style={{ textDecoration: 'none' }}
              // >
              <div
                key={generateRandomString()}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '10px',
                  borderRadius: '4px',
                  background:
                    selectedMenu === item.data.name
                      ? theme?.palette?.background?.default
                      : theme?.palette?.light?.c50,
                  color:
                    selectedMenu === item.data.name
                      ? theme?.palette?.primary?.main
                      : theme?.palette?.text?.main,
                }}
                onClick={() => {
                  setClicked(isClicked !== index ? index : -1);
                  setSelectedMenu(item.data.name);

                  dispatch(setActiveMenuName(item.data.name));
                  if (item && item.child && item.child.length > 0) {
                    dispatch(setPageId(''));
                  } else {
                    dispatch(setPageId(item.data.pageId));
                  }
                  props.setSelectedMenuName(item.data.name);
                  navigate(
                    `/project/${params.projectId}/${
                      item.data.name || params.menuId
                    }`
                  );
                }}
              >
                {console.log(item)}
                <IconComponent
                  name={item.data.icon}
                  size={25}
                  label={item.data.name}
                  color={
                    selectedMenu === item.data.name
                      ? theme?.palette?.primary?.main
                      : theme?.palette?.text?.main
                  }
                />
              </div>
              // </Link>
            );
          })}
      </Stack>
    </Box>
  );
};

export default SideNav;
