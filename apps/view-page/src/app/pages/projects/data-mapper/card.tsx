import { cardheaderData } from 'apps/view-page/src/fake-db/scatterData';
import themes from 'apps/view-page/src/theme';

interface IDataResponse {
  headerData: any;
  chartData: any;
  cardProps: any;
}

interface chartData {
  data: any;
  fontData: any;
}

export const SimpleCardDataMapping = (
  response: any,
  inputData: chartData
): any => {
  const theme = themes;
  let dataResponse: IDataResponse = {
    chartData: {},
    headerData: {},
    cardProps: {},
  };
  const defaultProps = {
    data: {
      // title: 'This si title',
      // stat: 'asdfg',
      // iconName: 'Search',
      link: 'View All',
      title: inputData?.data?.formData?.Title || '',
      stat: Math.floor(Math.random() * 1000),
      icon: {
        name: 'Search',
        size: 30,
        color: theme?.default?.palette?.primary?.pri400,
      },
    },
    chartProps: {
      background_color: themes.default?.palette?.background?.bacopWhite,
      icon_bgcolor: themes.default?.palette?.background?.bacmain,
      subtitle_color: themes.default?.palette?.primary?.pri400,
      link_color: themes.default?.palette?.systemColor2?.sys400,
    },
  };
  dataResponse = {
    headerData: {
      title: inputData?.data?.formData?.Title || 'no title',
      searchData: {
        label: 'Search',
        placeholder: 'Search by Customer Name, SSE ID, Phone Numbe',
        value: '',
      },

      actions: [
        {
          menu: 'Filter',
          icon: {
            name: 'filter_alt_black_24dp',
            size: 25,
            color: themes?.default?.palette?.neutral?.neu400,
            label: 'Filter',
          },
          submenu: [],
        },
        {
          menu: 'Download',
          icon: {
            name: 'file_upload_black_24dp-1',
            size: 25,
            color: themes?.default?.palette?.neutral?.neu400,
            label: 'Download',
          },
          submenu: [],
        },
      ],
    },
    chartData: defaultProps,

    cardProps: {},
  };
  console.log('hi guys', dataResponse.chartData, inputData);
  return dataResponse.chartData;
};
