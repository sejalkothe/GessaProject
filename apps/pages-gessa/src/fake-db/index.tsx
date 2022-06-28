import mock from './mock';
import './db/report-data-db';
import './db/color-font-db';

// Set this to true to enable mock APIs
const enableMock = true;

if (enableMock) {
  console.log('enableMock', enableMock);
  mock.onAny().passThrough();
} else {
  console.log('enableMock else', enableMock);
  mock.restore();
}
