var APP_ID = 'GhRU94GJQmPcIjmFTgLdYB0h-gzGzoHsz';
var APP_KEY = 'g53keHarPnnzwQjyBMSPOtSd';
var AV = require('leancloud-storage');

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV 