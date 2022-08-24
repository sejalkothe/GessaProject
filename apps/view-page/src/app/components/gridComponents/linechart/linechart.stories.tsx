// import { Meta, Story } from '@storybook/react';
// import LineChart from './linechart';
// import themes from '../../../theme';
// import { withDesign } from 'storybook-addon-designs';

// export default {
//   title: 'Charts/LineChart',
//   component: LineChart,
//   decorators: [withDesign],
// } as Meta;

// const Template: Story<any> = (args) => <LineChart {...args} />;

// export const BasicLineChart = Template.bind({});
// BasicLineChart.args = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: themes.default.palette.custom.storeNode,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//       },
//     ],
//   },
// };
// BasicLineChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const MultiAxisLineChart = Template.bind({});
// MultiAxisLineChart.args = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: themes.default.palette.custom.storeNode,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//       },
//       {
//         label: 'Dataset 2',
//         data: [70, 51, 85, 71, 46, 59, 48],
//         borderColor: themes.default.palette.custom.formError,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//       },
//     ],
//   },
// };
// MultiAxisLineChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const CurvyAxisLineChart = Template.bind({});
// CurvyAxisLineChart.args = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: themes.default.palette.custom.formError,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [70, 51, 85, 71, 46, 59, 48],
//         borderColor: themes.default.palette.custom.inputNode,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//     ],
//   },
// };
// CurvyAxisLineChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const FilledLineChart = Template.bind({});
// FilledLineChart.args = {
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: themes.default.palette.custom.inputNode,
//         fill: true,
//         pointRadius: 2,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [70, 51, 85, 71, 46, 59, 48],
//         borderColor: themes.default.palette.custom.outputNode,
//         pointRadius: 2,
//         // fill: true,
//         pointStyle: 'circle',
//         borderWidth: 1,
//         tension: 0.5,
//       },
//     ],
//   },
// };
// FilledLineChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };
