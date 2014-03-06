/**
 * @type {string}
 */
var SCOPE_MY = "my";
/**
 * @type {string}
 */
var SCOPE_TOPIC_POST = "topic.post";
/**
 * @type {string}
 */
var SCOPE_TOPIC_READ = "topic.read";

/**
 * Create Typetalk API Client.
 * @param {string} clientId client id.
 * @param {string} clientSecret client secret.
 * @param {[]} scopes scope array.
 * @param {Object} option optional you can set name property for set instance name.
 * @return {TypetalkApp} typetalk API Client instance
 */
function create(clientId, clientSecret, scopes, option) {
  
  if(clientId == null
     || clientSecret == null
     || scopes == null
     || scopes.length == 0
    ) {
    throw new Error("parameters is missing.");
  }
  
  return new TypetalkAPI(clientId, clientSecret, scopes, option);
}

/**
 * Check authorize status.
 * @return {Boolean} if already authorized, return true.
 */
function isAuthorized() {
  throw new Error("this method is dummy, please call create method before call this method");  
}

/**
 * Authorize by your account.
 * @return {Object} authrozation result
 */
function authorize() {
  throw new Error("this method is dummy, please call create method before call this method");  
}

/**
 * Authorize by your account.
 * @param {string} callback callback function name
 * @param {Object} optArg optional. callback function argument.
 * @return {string} authrozation url
 */
function getAuthorizeUrl(callback, optArg) {
  throw new Error("this method is dummy, please call create method before call this method");  
}

/**
 * Save access token.
 * @param {string} code code
 * @return {Object} authorization result
 */
function saveAccessToken(code) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Get a profile.
 * @return {Object} profile object.
 */
function getProfile() {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Get Topics.
 * @return {Object} topics object.
 */
function getTopics() {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Get a Topic.
 * @param {Number} topicId
 * @return {Object} topic object
 */
function getTopic(topicId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Mark a message favorite.
 * @param {Number} topicId
 * @return {Object} result object
 */
function favoriteTopic(topicId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Unmark a message favorite.
 * @param {Number} topicId topic id
 * @return {Object} result object
 */
function unfavoriteTopic(topicId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Get notification count .
 * @return {Object} result object
 */
function getNotificationStatus() {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Mark read notifications.
 * @return {Object} result object
 */
function openNotifications() {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Mark read topic messages.
 * @param {Number} topicId topic id 
 * @param {Number} optPostId optional. post id 
 * @return {Object} result object
 */
function saveBookmark(topicId, optPostId) {
  throw new Error("this method is dummy, please call create method before call this method");
}


/**
 * Get mentions.
 * @param {Object} option optional parameter. you can set "from" : the mention id and "unread" : true or false like {from : 1, unread : true}
 * @return {Object} result object
 */
function getMentions(option) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Mark read mention.
 * @param {Number} mentionId
 * @return {Object} result object
 */
function openMention(mentionId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Get a message
 * @param {Number} topicId topic Id
 * @param {Number} postId post id
 * @return {Object} The message object
 */
function getMessage(topicId, postId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Post a message
 * @param {Number} topicId topic Id
 * @param {string} message a message
 * @param {Object} optParams optional parameter
 * @return {Object} The message object
 */
function postMessage(topicId, message, optParams) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Delete a message
 * @param {Number} topicId topic Id
 * @param {Number} postId post id
 * @return {Object} The message object
 */
function deleteMessage(topicId, postId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Mark like a message
 * @param {Number} topicId topic Id
 * @param {Number} postId post id
 * @return {Object} The message object
 */
function likeMessage(topicId, postId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Unmark like a message
 * @param {Number} topicId topic Id
 * @param {Number} postId post id
 * @return {Object} The message object
 */
function unlikeMessage(topicId, postId) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Upload a file
 * @param {Number} topicId topic Id
 * @param {Blob} fileBlob uploaded file
 * @return {Object} result object
 */
function uploadFile(topicId, fileBlob) {
  throw new Error("this method is dummy, please call create method before call this method");
}

/**
 * Delete saved credencials
 */
function deleteCredential() {
  throw new Error("this method is dummy, please call create method before call this method");
}
/**
 * Set a property.
 * @param {PropertiesService_Properties} prop
 */
function setProperty(prop) {
  throw new Error("this method is dummy, please call create method before call this method");
}




