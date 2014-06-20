/* global require, define */
define(['jquery', 'underscore', 'Backbone', 'Ractive'], function($, _, Backbone, Ractive){

  return {
    /**
     * Globally capture clicks on hyperlinks. If they are internal and not in the pass
     * through list, route them through Backbone's navigate method.
     * 
     */
    delegateNavigation: function(rootUrl, router){

      $(document).on("click", "a[href^='/']", function(event) {

        var href = $(event.currentTarget).attr('href');

        //chain 'or's for other black list routes
        var passThrough = href.indexOf('sign_out') >= 0

        //Allow shift+click for new tabs, etc.
        if(!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){
          event.preventDefault();
        }

        //Remove leading slashes and hash bangs (backward compatablility)
        var url = href.replace(/^\//,'').replace('\#\!\/','');

        //Instruct Backbone to trigger routing events
        router.navigate(url, { trigger: true });

        return false;
      });
    },
    /**
     * Parse query string.
     * ?a=b&c=d to {a: b, c: d}
     * @param {String} (option) queryString
     * @return {Object} query params
     */
    getQueryParams: function(queryString) {
      var query = (queryString || window.location.search).substring(1); // delete ?
      if (!query) {
        return false;
      }
      return _
             .chain(query.split('&'))
             .map(function(params) {
               var p = params.split('=');
               return [p[0], decodeURIComponent(p[1])];
             })
             .object()
             .value();
    }
  };
});