var clientId = '';
var apiKey = '';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load('analytics', 'v3', function() {
      var request = gapi.client.analytics.data.ga.get({
          'ids':'ga:34968093', 
          'start-date':'2012-01-01', 
          'end-date':'2012-02-01', 
          'metrics':'ga:visits', 
          'start-index':1, 
          'max-results':1000
      });
      request.execute(function(resp) { console.log(resp.totalsForAllResults); });
  });
}