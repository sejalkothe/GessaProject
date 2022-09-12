import { IconComponent } from '@gessa/component-library';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export interface ISideNav {
  menuList: any;
  selectedMenuName: string;
  setSelectedMenuName: (data: any) => any;
}
const SideNav = (props: ISideNav) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const [appMenu, setAppMenu]: any = useState<Array<any>>([]);
  const [isClicked, setClicked]: any = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    params.menuId || props.selectedMenuName
  );

  useEffect(() => {
    if (props && props.menuList) {
      setAppMenu(props.menuList);
    }
  }, [props.menuList]);

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
                  props.setSelectedMenuName(item.data.name);
                  navigate(
                    `/project/${params.projectId}/${
                      item.data.name || params.menuId
                    }`
                  );
                }}
              >
                <IconComponent
                  name={item.data.icon}
                  size={25}
                  label={item.data.icon}
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
