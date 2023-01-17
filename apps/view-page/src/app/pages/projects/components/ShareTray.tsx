import { IconComponent } from '@gessa/component-library';
import { Box, Typography } from '@mui/material';
import themes from 'apps/view-page/src/theme';
import React from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from 'react-share';
import { text } from 'stream/consumers';
export interface IShareTray {
  data: any;
  onClose: (data?: any) => void;
}

const ShareTray = (props: IShareTray) => {
  const themeChart = themes.default;

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: themeChart.palette?.background?.bacopWhite,
        color: themes?.default?.palette?.text?.tex600,
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '48px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          width: '100%',

          borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              props && props.onClose && props.onClose();
            }}
          >
            <Typography>Share link with</Typography>
          </div>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              props && props.onClose && props.onClose();
            }}
          >
            <IconComponent
              {...{
                name: 'close_black_24dp',
                color: themes?.default?.palette?.text?.tex600,
                size: 25,
                label: 'Close',
              }}
            ></IconComponent>
          </div>
        </Box>
      </div>
      <div
        style={{
          padding: 10,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 100,
          width: '100%',
        }}
      >
        Share link with:
        <div
          style={{
            width: '100%',
            padding: 10,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <FacebookShareButton url={props.data}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <EmailShareButton url={''} body={props.data}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <WhatsappShareButton url={props.data}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton url={props.data}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={props.data}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ShareTray;
