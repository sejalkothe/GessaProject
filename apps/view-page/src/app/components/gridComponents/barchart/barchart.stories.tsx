// import { Meta, Story } from '@storybook/react';
// import Barchart from './barchart';
// import themes from '../../../theme';
// import { withDesign } from 'storybook-addon-designs';

// export default {
//   title: 'Charts/BarChart',
//   component: Barchart,
//   decorators: [withDesign],
// } as Meta;

// const Template: Story<any> = (args) => <Barchart {...args} />;

// export const BasicBarChart = Template.bind({});
// BasicBarChart.args = {
//   data: {
//     labels: ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//         ],
//         borderColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//         ],
//         borderWidth: 1,
//         borderRadius: 5,
//       },
//     ],
//   },
// };
// BasicBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const MultiBarChart = Template.bind({});
// MultiBarChart.args = {
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [500, 200, 100, 700, 300, 550, 230],
//         backgroundColor: themes.default.palette.custom.form1,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.inputNode,
//         borderRadius: 5,
//       },
//     ],
//   },
// };
// MultiBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const StackedBarChart = Template.bind({});
// StackedBarChart.args = {
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [500, 200, 100, 700, 300, 550, 230],
//         backgroundColor: themes.default.palette.custom.form2,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.formError,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 3',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.transformNode,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 4',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.outputNode,
//         borderRadius: 5,
//       },
//     ],
//   },
//   stacked: true,
// };
// StackedBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// // horizontal bar charts ...............

// export const BasicHorizontalBarChart = Template.bind({});
// BasicHorizontalBarChart.args = {
//   horizontal: true,
//   data: {
//     horizontal: true,
//     labels: ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//         ],
//         borderColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.form1,
//         ],
//         borderWidth: 1,
//         borderRadius: 5,
//       },
//     ],
//   },
// };
// BasicHorizontalBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const MultiHorizontalBarChart = Template.bind({});
// MultiHorizontalBarChart.args = {
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [500, 200, 100, 700, 300, 550, 230],
//         backgroundColor: themes.default.palette.custom.form1,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.inputNode,
//         borderRadius: 5,
//       },
//     ],
//   },
//   horizontal: true,
// };
// MultiHorizontalBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const StackedHorizontalBarChart = Template.bind({});
// StackedHorizontalBarChart.args = {
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [500, 200, 100, 700, 300, 550, 230],
//         backgroundColor: themes.default.palette.custom.form2,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 2',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.formError,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 3',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.transformNode,
//         borderRadius: 5,
//       },
//       {
//         label: 'Dataset 3',
//         data: [200, 900, 350, 520, 1000, 330, 440],
//         backgroundColor: themes.default.palette.custom.outputNode,
//         borderRadius: 5,
//       },
//     ],
//   },
//   stacked: true,
//   horizontal: true,
// };
// StackedHorizontalBarChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };
