do(global=@)->
    class TypetalkAPI

        constructor : (@clientId, @clientSecret, @scopes, @option=name:"")->
            @BASE_URI = "https://typetalk.in/api/"
            @API_VESION = "v1"
            @prop = PropertiesService.getUserProperties()

        setProperty : (prop)=>
            @prop = prop

        getProfile : ()=>
            return @fetch_ "get", @apiUrl_("/profile")

        getTopics : ()=>
            return @fetch_ "get", @apiUrl_("/topics")

        getTopic : (topicId)=>
            return @fetch_ "get", @apiUrl_("/topics/:topicId", topicId : topicId)

        favoriteTopic : (topicId)=>
            return @fetch_ "post", @apiUrl_("/topics/:topicId/favorite", topicId : topicId)

        unfavoriteTopic : (topicId)=>
            return @fetch_ "delete", @apiUrl_("/topics/:topicId/favorite", topicId : topicId)

        getNotificationStatus : ()=>
            return @fetch_ "get", @apiUrl_("/notifications/status")

        openNotifications : ()=>
            return @fetch_ "put", @apiUrl_("/notifications/open")

        saveBookmark : (topicId, optPostId)=>
            option = topicId : "#{topicId}"
            optPostId && option.postId = "#{optPostId}"
            return @fetch_ "post", @apiUrl_("/bookmark/save"), payload : option

        getMentions : (option={})=>
            return @fetch_ "get", @apiUrl_("/mentions", option)

        openMention : (mentionId)=>
            return @fetch_ "put", @apiUrl_("/mentions/:mentionId", mentionId : mentionId)

        getMessage : (topicId, postId)=>
            return @fetch_ "get", @apiUrl_("/topics/:topicId/posts/:postId", {topicId : topicId, postId : postId})

        postMessage : (topicId, message, optParams={})=>
            optParams.message = message
            return @fetch_ "post", @apiUrl_("/topics/:topicId", topicId : topicId), payload : optParams

        deleteMessage : (topicId, postId)=>
            return @fetch_ "delete", @apiUrl_("/topics/:topicId/posts/:postId", {topicId : topicId, postId : postId})

        likeMessage : (topicId, postId)=>
            return @fetch_ "post", @apiUrl_("/topics/:topicId/posts/:postId/like", {topicId : topicId, postId : postId})

        unlikeMessage : (topicId, postId)=>
            return @fetch_ "delete", @apiUrl_("/topics/:topicId/posts/:postId/like", {topicId : topicId, postId : postId})

        uploadFile : (topicId, fileBlob)=>
            return @fetch_ "post", @apiUrl_("/topics/:topicId/attachments", topicId : topicId), payload : file : fileBlob

        deleteCredential : ()=>
            @deleteCredencial()

        deleteCredencial : ()=>
            @prop.deleteProperty("TypetalkApp_credencial#{@option.name}") if @isAuthorized()

        isAuthorized : ()=>
            return @getCredencial_("access_token")?

        apiUrl_ : (path, params)=>
            uri = "#{@BASE_URI}#{@API_VESION}#{path}"
            return uri if !params

            q = []
            for key, value of params
                if uri.indexOf(key) >= 0
                    uri = uri.replace ":#{key}" , value
                else
                    q.push "#{encodeURI(key)}=#{encodeURI(value)}"

            if q.length > 0
                uri +="?#{q.join('&')}"

            return uri

        getCredencial_ : (name)=>
            return @cache[name] if @cache_ && @cache[name]

            credencial = @prop.getProperty("TypetalkApp_credencial#{@option.name}")
            return null if !credencial?
            @cache = JSON.parse credencial
            return @cache[name]

        fetch_ : (method, url, option={}, reauth)=>
            access_token = @getCredencial_("access_token")

            throw new Error("Please call authorize") if !access_token?

            try

                opt =
                    method : method
                    headers :
                        Authorization: "Bearer #{access_token}"

                option.payload && opt.payload = option.payload
                option.contentType && opt.contentType = option.contentType

                if reauth
                  res = @uox => UrlFetchApp.fetch url, opt
                else
                  res = UrlFetchApp.fetch url, opt
                return JSON.parse(res.getContentText())
            catch e
                Logger.log e
                throw e if reauth
                @reauthorize_()
                return @fetch_(method , url, option, true)

        reauthorize_ : ()=>

            refreshToken = @getCredencial_("refresh_token")

            throw new Error("does not have refresh token, Please call authorize" ) if !refreshToken?

            res = @uox => UrlFetchApp.fetch "https://typetalk.in/oauth2/access_token" ,
                method : "post"
                payload :
                    client_id : @clientId
                    client_secret : @clientSecret
                    refresh_token : refreshToken
                    grant_type : "refresh_token"
            @prop.setProperty("TypetalkApp_credencial#{@option.name}", res.getContentText())
            return JSON.parse(res.getContentText()).access_token


        authorize : ()=>
            res = @uox => UrlFetchApp.fetch "https://typetalk.in/oauth2/access_token" ,
                method : "post"
                payload :
                    client_id : @clientId
                    client_secret : @clientSecret
                    scope : @scopes.join(",")
                    grant_type : "client_credentials"
            @prop.setProperty("TypetalkApp_credencial#{@option.name}", res.getContentText())
            return JSON.parse(res.getContentText()).access_token

        saveAccessToken : (code)=>
            res = @uox => UrlFetchApp.fetch "https://typetalk.in/oauth2/access_token" ,
                method : "post"
                payload :
                    client_id : @clientId
                    client_secret : @clientSecret
                    redirect_uri : @prop.getProperty("TypetalkApp_redirectURI#{@option.name}")
                    code : code
                    grant_type : "authorization_code"
            @prop.setProperty("TypetalkApp_credencial#{@option.name}", res.getContentText())
            return JSON.parse(res.getContentText()).access_token

        getAuthorizeUrl : (callback,optArg) =>
            redirectUri = @getCallbackURL(callback, optArg)
            @prop.setProperty("TypetalkApp_redirectURI#{@option.name}", redirectUri)
            "https://typetalk.in/oauth2/authorize?client_id=#{@clientId}&scope=#{@scopes.join(',')}&response_type=code&redirect_uri=#{redirectUri}"


        getCallbackURL : (callback,optArg = {}) ->
            url = ScriptApp.getService().getUrl()
            if url.indexOf("/exec") >= 0
                url = url.slice(0, -4) + 'usercallback?state='
            else
                url = url.slice(0, -3) + 'usercallback?state='
            builder = ScriptApp.newStateToken()
            .withMethod(callback)
            builder.withTimeout(optArg.timeout) if optArg.timeout
            builder.withArgument("param", JSON.stringify(optArg)) if optArg

            stateToken = builder.createToken()
            "#{url}#{stateToken}"

        uox : (f, retry=3)=>
          count = 0
          while true
            try
              return f()
            catch e
              if count > retry
                throw e
              Utilities.sleep 1000
              count++
    global.TypetalkAPI =TypetalkAPI
