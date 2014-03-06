var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(global) {
  var TypetalkAPI;
  TypetalkAPI = (function() {

    TypetalkAPI.name = 'TypetalkAPI';

    function TypetalkAPI(clientId, clientSecret, scopes, option) {
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.scopes = scopes;
      this.option = option != null ? option : {
        name: ""
      };
      this.getAuthorizeUrl = __bind(this.getAuthorizeUrl, this);

      this.saveAccessToken = __bind(this.saveAccessToken, this);

      this.authorize = __bind(this.authorize, this);

      this.reauthorize_ = __bind(this.reauthorize_, this);

      this.fetch_ = __bind(this.fetch_, this);

      this.getCredencial_ = __bind(this.getCredencial_, this);

      this.apiUrl_ = __bind(this.apiUrl_, this);

      this.isAuthorized = __bind(this.isAuthorized, this);

      this.deleteCredencial = __bind(this.deleteCredencial, this);

      this.deleteCredential = __bind(this.deleteCredential, this);

      this.uploadFile = __bind(this.uploadFile, this);

      this.unlikeMessage = __bind(this.unlikeMessage, this);

      this.likeMessage = __bind(this.likeMessage, this);

      this.deleteMessage = __bind(this.deleteMessage, this);

      this.postMessage = __bind(this.postMessage, this);

      this.getMessage = __bind(this.getMessage, this);

      this.openMention = __bind(this.openMention, this);

      this.getMentions = __bind(this.getMentions, this);

      this.saveBookmark = __bind(this.saveBookmark, this);

      this.openNotifications = __bind(this.openNotifications, this);

      this.getNotificationStatus = __bind(this.getNotificationStatus, this);

      this.unfavoriteTopic = __bind(this.unfavoriteTopic, this);

      this.favoriteTopic = __bind(this.favoriteTopic, this);

      this.getTopic = __bind(this.getTopic, this);

      this.getTopics = __bind(this.getTopics, this);

      this.getProfile = __bind(this.getProfile, this);

      this.setProperty = __bind(this.setProperty, this);

      this.BASE_URI = "https://typetalk.in/api/";
      this.API_VESION = "v1";
      this.prop = PropertiesService.getUserProperties();
    }

    TypetalkAPI.prototype.setProperty = function(prop) {
      return this.prop = prop;
    };

    TypetalkAPI.prototype.getProfile = function() {
      return this.fetch_("get", this.apiUrl_("/profile"));
    };

    TypetalkAPI.prototype.getTopics = function() {
      return this.fetch_("get", this.apiUrl_("/topics"));
    };

    TypetalkAPI.prototype.getTopic = function(topicId) {
      return this.fetch_("get", this.apiUrl_("/topics/:topicId", {
        topicId: topicId
      }));
    };

    TypetalkAPI.prototype.favoriteTopic = function(topicId) {
      return this.fetch_("post", this.apiUrl_("/topics/:topicId/favorite", {
        topicId: topicId
      }));
    };

    TypetalkAPI.prototype.unfavoriteTopic = function(topicId) {
      return this.fetch_("delete", this.apiUrl_("/topics/:topicId/favorite", {
        topicId: topicId
      }));
    };

    TypetalkAPI.prototype.getNotificationStatus = function() {
      return this.fetch_("get", this.apiUrl_("/notifications/status"));
    };

    TypetalkAPI.prototype.openNotifications = function() {
      return this.fetch_("put", this.apiUrl_("/notifications/open"));
    };

    TypetalkAPI.prototype.saveBookmark = function(topicId, optPostId) {
      var option;
      option = {
        topicId: "" + topicId
      };
      optPostId && (option.postId = "" + optPostId);
      return this.fetch_("post", this.apiUrl_("/bookmark/save"), {
        payload: option
      });
    };

    TypetalkAPI.prototype.getMentions = function(option) {
      if (option == null) option = {};
      return this.fetch_("get", this.apiUrl_("/mentions", option));
    };

    TypetalkAPI.prototype.openMention = function(mentionId) {
      return this.fetch_("put", this.apiUrl_("/mentions/:mentionId", {
        mentionId: mentionId
      }));
    };

    TypetalkAPI.prototype.getMessage = function(topicId, postId) {
      return this.fetch_("get", this.apiUrl_("/topics/:topicId/posts/:postId", {
        topicId: topicId,
        postId: postId
      }));
    };

    TypetalkAPI.prototype.postMessage = function(topicId, message, optParams) {
      if (optParams == null) optParams = {};
      optParams.message = message;
      return this.fetch_("post", this.apiUrl_("/topics/:topicId", {
        topicId: topicId
      }), {
        payload: optParams
      });
    };

    TypetalkAPI.prototype.deleteMessage = function(topicId, postId) {
      return this.fetch_("delete", this.apiUrl_("/topics/:topicId/posts/:postId", {
        topicId: topicId,
        postId: postId
      }));
    };

    TypetalkAPI.prototype.likeMessage = function(topicId, postId) {
      return this.fetch_("post", this.apiUrl_("/topics/:topicId/posts/:postId/like", {
        topicId: topicId,
        postId: postId
      }));
    };

    TypetalkAPI.prototype.unlikeMessage = function(topicId, postId) {
      return this.fetch_("delete", this.apiUrl_("/topics/:topicId/posts/:postId/like", {
        topicId: topicId,
        postId: postId
      }));
    };

    TypetalkAPI.prototype.uploadFile = function(topicId, fileBlob) {
      return this.fetch_("post", this.apiUrl_("/topics/:topicId/attachments", {
        topicId: topicId
      }), {
        payload: {
          file: fileBlob
        }
      });
    };

    TypetalkAPI.prototype.deleteCredential = function() {
      return this.deleteCredencial();
    };

    TypetalkAPI.prototype.deleteCredencial = function() {
      if (this.isAuthorized()) {
        return this.prop.deleteProperty("TypetalkApp_credencial" + this.option.name);
      }
    };

    TypetalkAPI.prototype.isAuthorized = function() {
      return this.getCredencial_("access_token") != null;
    };

    TypetalkAPI.prototype.apiUrl_ = function(path, params) {
      var key, q, uri, value;
      uri = "" + this.BASE_URI + this.API_VESION + path;
      if (!params) return uri;
      q = [];
      for (key in params) {
        value = params[key];
        if (uri.indexOf(key) >= 0) {
          uri = uri.replace(":" + key, value);
        } else {
          q.push("" + (encodeURI(key)) + "=" + (encodeURI(value)));
        }
      }
      if (q.length > 0) uri += "?" + (q.join('&'));
      return uri;
    };

    TypetalkAPI.prototype.getCredencial_ = function(name) {
      var credencial;
      if (this.cache_ && this.cache[name]) return this.cache[name];
      credencial = this.prop.getProperty("TypetalkApp_credencial" + this.option.name);
      if (!(credencial != null)) return null;
      this.cache = JSON.parse(credencial);
      return this.cache[name];
    };

    TypetalkAPI.prototype.fetch_ = function(method, url, option, reauth) {
      var access_token, opt, res;
      if (option == null) option = {};
      access_token = this.getCredencial_("access_token");
      if (!(access_token != null)) throw new Error("Please call authorize");
      try {
        opt = {
          method: method,
          headers: {
            Authorization: "Bearer " + access_token
          }
        };
        option.payload && (opt.payload = option.payload);
        option.contentType && (opt.contentType = option.contentType);
        res = UrlFetchApp.fetch(url, opt);
        return JSON.parse(res.getContentText());
      } catch (e) {
        Logger.log(e);
        if (reauth) throw e;
        this.reauthorize_();
        return this.fetch_(method, url, option, true);
      }
    };

    TypetalkAPI.prototype.reauthorize_ = function() {
      var refreshToken, res;
      refreshToken = this.getCredencial_("refresh_token");
      if (!(refreshToken != null)) {
        throw new Error("does not have refresh token, Please call authorize");
      }
      res = UrlFetchApp.fetch("https://typetalk.in/oauth2/access_token", {
        method: "post",
        payload: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token"
        }
      });
      this.prop.setProperty("TypetalkApp_credencial" + this.option.name, res.getContentText());
      return JSON.parse(res.getContentText()).access_token;
    };

    TypetalkAPI.prototype.authorize = function() {
      var res;
      res = UrlFetchApp.fetch("https://typetalk.in/oauth2/access_token", {
        method: "post",
        payload: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: this.scopes.join(","),
          grant_type: "client_credentials"
        }
      });
      this.prop.setProperty("TypetalkApp_credencial" + this.option.name, res.getContentText());
      return JSON.parse(res.getContentText()).access_token;
    };

    TypetalkAPI.prototype.saveAccessToken = function(code) {
      var res;
      res = UrlFetchApp.fetch("https://typetalk.in/oauth2/access_token", {
        method: "post",
        payload: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.prop.getProperty("TypetalkApp_redirectURI" + this.option.name),
          code: code,
          grant_type: "authorization_code"
        }
      });
      this.prop.setProperty("TypetalkApp_credencial" + this.option.name, res.getContentText());
      return JSON.parse(res.getContentText()).access_token;
    };

    TypetalkAPI.prototype.getAuthorizeUrl = function(callback, optArg) {
      var redirectUri;
      redirectUri = this.getCallbackURL(callback, optArg);
      this.prop.setProperty("TypetalkApp_redirectURI" + this.option.name, redirectUri);
      return "https://typetalk.in/oauth2/authorize?client_id=" + this.clientId + "&scope=" + (this.scopes.join(',')) + "&response_type=code&redirect_uri=" + redirectUri;
    };

    TypetalkAPI.prototype.getCallbackURL = function(callback, optArg) {
      var builder, stateToken, url;
      if (optArg == null) optArg = {};
      url = ScriptApp.getService().getUrl();
      if (url.indexOf("/exec") >= 0) {
        url = url.slice(0, -4) + 'usercallback?state=';
      } else {
        url = url.slice(0, -3) + 'usercallback?state=';
      }
      builder = ScriptApp.newStateToken().withMethod(callback);
      if (optArg.timeout) builder.withTimeout(optArg.timeout);
      if (optArg) builder.withArgument("param", JSON.stringify(optArg));
      stateToken = builder.createToken();
      return "" + url + stateToken;
    };

    return TypetalkAPI;

  })();
  return global.TypetalkAPI = TypetalkAPI;
})(this);
