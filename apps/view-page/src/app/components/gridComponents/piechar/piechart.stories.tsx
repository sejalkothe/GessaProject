// import themes from '../../../theme';
// import { Meta, Story } from '@storybook/react';
// import PieChart, { PieChartProps } from './piechart';
// import { withDesign } from 'storybook-addon-designs';

// export default {
//   title: 'Charts/PieChart',
//   component: PieChart,
//   decorators: [withDesign],
// } as Meta;

// const Template: Story<PieChartProps> = (args) => <PieChart {...args} />;

// export const BasicPieChart = Template.bind({});
// BasicPieChart.args = {
//   data: {
//     labels: ['Blue', 'Red', 'Purple', 'Green', 'Yello'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2],
//         backgroundColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.inputNode,
//           themes.default.palette.custom.transformNode,
//           themes.default.palette.custom.outputNode,
//           themes.default.palette.custom.formError,
//         ],

//         borderWidth: 1,
//       },
//       {
//         label: '# of ',
//         data: [null, null, null, null, null],
//         backgroundColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.inputNode,
//           themes.default.palette.custom.transformNode,
//           themes.default.palette.custom.outputNode,
//           themes.default.palette.custom.formError,
//         ],

//         borderWidth: 1,
//       },
//     ],
//   },
// };
// BasicPieChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };

// export const RightSideLegendPieChart = Template.bind({});
// RightSideLegendPieChart.args = {
//   legend: 'right',
//   data: {
//     labels: ['Blue', 'Red', 'Purple', 'Green', 'Yello'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2],
//         backgroundColor: [
//           themes.default.palette.custom.form1,
//           themes.default.palette.custom.inputNode,
//           themes.default.palette.custom.transformNode,
//           themes.default.palette.custom.outputNode,
//           themes.default.palette.custom.formError,
//         ],

//         borderWidth: 1,
//       },
//     ],
//   },
// };
// RightSideLegendPieChart.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/proto/ByIvCrteT7rhSlgkX1wYxE/IAURO---DSL?node-id=751%3A26112&scaling=min-zoom&page-id=142%3A5528&starting-point-node-id=294%3A41952',
//   },
// };
