var bot;
var headers;
var baseUrl;
$('iframe').on('load', function() {
    alert("hi") 
});

function stage() {
  console.log("called stage");
}
function area() {
  console.log("called area");
}
function completequests() {
  console.log("called completequests");
}
function completeevents() {
  console.log("called completeevents");
}
function clash() {
  console.log("called clash");
}
function dragonballs() {
  console.log("called dragonballs");
}
function omegafarm() {
  console.log("called omegafarm");
}
function info() {
  console.log("called info");
}
function team() {
  console.log("called team");
}
function gift() {
  console.log("called gift");
}
function transfer() {
  console.log("called transfer");
}
function capacity() {
  console.log("called capacity");
}

function nameop() {
  console.log("called name");
}
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function signup(platform,region) {
  var config = guid();
  let user_acc = {
    ad_id: config.ad_id,
    country: "AU",
    currency: "AUD",
    device: "samsung",
    device_model: "SM-E7000",
    os_version: "7.0",
    platform: platform,
    unique_id: config.unique_id
  };
  var json_body = { user_account: user_acc };
  headers = {
    "User-Agent":
      "Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0",
    Accept: "*/*",
    "Content-type": "application/json",
    "X-Platform": platform,
    "X-ClientVersion": "////"
  };

baseUrl = "https://cors-anywhere.herokuapp.com/https://ishin-global.aktsk.com";
if(region == "japan") baseUrl = "https://cors-anywhere.herokuapp.com/http://ishin-production.aktsk.jp"
    

var url = baseUrl+"/auth/sign_up"
  var res = await fetch(url, {
    method: "post",
    body: JSON.stringify(json_body),
    headers: headers
  }).then(res => res.json());
  eModal.iframe(res.captcha_url, 'Captcha Verification')
  var session_key = res.captcha_session_key;

  await sleep(20000);
  json_body.captcha_session_key = session_key;
  res = await fetch(url, {
    method: "post",
    body: JSON.stringify(json_body),
    headers: headers
  }).then(res => res.json());
  if (res.message == "Verification completed." || res.message == "認証に成功しました。") {
    bot = {
      id: res.user.id,
      name: res.user.name,
      identifier: atob(res.identifier),
      platform:platform,
      ad_id: config.ad_id,
      unique_id: config.unique_id
    };
    console.log("Account created, Loggin in:")
    await signin(bot)
    
  }
}

async function createaccount() {
    var plat = $( "#platform" ).val();
    var region = $( "#region" ).val();
    await signup(plat,region)
    
}

async function signin(bot) {
    var basic_pwacc = bot.identifier.split(':')
    var complete_string = "Basic " +basic_pwacc[1] + ':' + basic_pwacc[0]
    var data = {
        ad_id: bot.ad_id,
        unique_id: bot.unique_id
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0',
        'Accept': '*/*',
        'Authorization': complete_string,
        'Content-type': 'application/json',
        'X-ClientVersion': '////',
        'X-Language': 'en',
        'X-UserCountry': 'AU',
        'X-UserCurrency': 'AUD',
        'X-Platform': bot.platform,
        }
        console.log(headers)
        console.log(data)
    var url = baseUrl + "/auth/sign_in";
    res = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: headers
      }).then(res => res.json());
    console.log(res)
}

function guid() {
  var UUID = uuidv4();
  var UniqueId = uuidv4() + ":" + UUID.substr(0, 8);
  return {
    ad_id: uuidv4(),
    unique_id: UniqueId
  };
}
