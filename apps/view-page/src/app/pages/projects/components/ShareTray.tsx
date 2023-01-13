import { IconComponent } from '@gessa/component-library';
import { Box } from '@mui/material';
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
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 10,

          borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
        }}
      >
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
        Share document with:
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
          <FacebookShareButton
            url={
              'https://s3.amazonaws.com/images.seroundtable.com/google-rainbow-texture-1491566442.jpg'
            }
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <EmailShareButton
            url={''}
            body={`<link>https://s3.amazonaws.com/images.seroundtable.com/google-rainbow-texture-1491566442.jpg</link>`}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <WhatsappShareButton
            url={`<link>https://s3.amazonaws.com/images.seroundtable.com/google-rainbow-texture-1491566442.jpg</link>
              `}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url={
              'https://s3.amazonaws.com/images.seroundtable.com/google-rainbow-texture-1491566442.jpg'
            }
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton
            url={
              'https://s3.amazonaws.com/images.seroundtable.com/google-rainbow-texture-1491566442.jpg'
            }
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ShareTray;
