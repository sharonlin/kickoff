app.factory('PostsService', ['$q',function ($q) {

var POSTS_PAGE_SIZE = 5;
var USER_PAGE_POSTS_PAGE_SIZE = 5;
  /**
    * Fetches a single post data.
    */
  function _getPostData(postId) {
    return firebase.database().ref('/posts/' + postId).once('value');
  }


  /**
     * Paginates posts from the user's home feed.
     *
     * Fetches a page of `POSTS_PAGE_SIZE` posts from the user's home feed.
     *
     * We return a `Promise` which resolves with an Map of posts and a function to the next page or
     * `null` if there is no next page.
     */
  function getHomeFeedPosts() {
    return _getPaginatedFeed('/feed/' + firebase.auth().currentUser.uid, POSTS_PAGE_SIZE, null, true);
  }


  function _getUserFeedPosts(uid) {
    return _getPaginatedFeed('/users/' + uid + '/posts', USER_PAGE_POSTS_PAGE_SIZE, null, true);
  }

  function getPosts() {
    return _getPaginatedFeed('/posts/', POSTS_PAGE_SIZE);
  }

  function _getPaginatedFeed(uri, pageSize, earliestEntryId = null, fetchPostDetails = false) {
    console.log('Fetching entries from', uri, 'start at', earliestEntryId, 'page size', pageSize);
    let ref = firebase.database().ref(uri);
    if (earliestEntryId) {
      ref = ref.orderByKey().endAt(earliestEntryId);
    }
    // We're fetching an additional item as a cheap way to test if there is a next page.
    return ref.limitToLast(pageSize + 1).once('value').then(function (data) {
      const entries = data.val() || {};

      // Figure out if there is a next page.
      let nextPage = null;
      const entryIds = Object.keys(entries);
      if (entryIds.length > pageSize) {
        delete entries[entryIds[0]];
        const nextPageStartingId = entryIds.shift();
        nextPage = _getPaginatedFeed(uri, pageSize, nextPageStartingId, fetchPostDetails);
      }
      if (fetchPostDetails) {
        // Fetch details of all posts.
        const queries = entryIds.map(function (postId) { return _getPostData(postId); });
        // Since all the requests are being done one the same feed it's unlikely that a single one
        // would fail and not the others so using Promise.all() is not so risky.
        return $q.all(queries).then(function (results) {
          const deleteOps = [];
          results.forEach(function (result) {
            if (result.val()) {
              entries[result.key] = result.val();
            } else {
              // We encountered a deleted post. Removing permanently from the feed.
              delete entries[result.key];
              deleteOps.push(this.deleteFromFeed(uri, result.key));
            }
          });
          if (deleteOps.length > 0) {
            // We had to remove some deleted posts from the feed. Lets run the query again to get
            // the correct number of posts.
            return _getPaginatedFeed(uri, pageSize, earliestEntryId, fetchPostDetails);
          }
          return { entries: entries, nextPage: nextPage };
        });
      }
      return { entries: entries, nextPage: nextPage };
    });
  }

  function _createPost(data) {
    const newPostKey = firebase.database().ref('/posts').push().key;
    const update = {};
    update['/posts/' + newPostKey] = {
      full_url: data.downloadURL,
      text: 'Bla Bla',
      timestamp: new Date().getTime(),
      full_storage_uri: data.fullStorageURI,
      author: {
        uid: firebase.auth().currentUser.uid,
        full_name: firebase.auth().currentUser.displayName,
        profile_picture: firebase.auth().currentUser.photoURL
      }
    };
    update['/users/' + firebase.auth().currentUser.uid + '/posts/' + newPostKey] = true;
    update['/feed/' + firebase.auth().currentUser.uid + '/' + newPostKey] = true;

    return firebase.database().ref().update(update).then(function () {
      return newPostKey;
    });
  }

  return {
    getUserFeedPosts: _getUserFeedPosts,
    createPost: _createPost,
    getPost:_getPostData
  };
}]); 