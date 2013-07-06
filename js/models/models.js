window.Config = Backbone.Model.extend({
   urlRoot: window.ROOTURL + "/config",
   idAttribute: "type",
   initialize: function() {},
   defaults: {
      type: "weibo",
      weiboid: "12345",
      username: "H W",
   }
});
window.Book = Backbone.Model.extend({

   urlRoot: window.ROOTURL + "/books",

   idAttribute: "_id",

   initialize: function() {
      this.validators = {};

      this.validators.name = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a name"
         };
      };

      this.validators.type = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a book type"
         };
      };

      this.validators.language = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a language"
         };
      };
   },
   validateItem: function(key) {
      return (this.validators[key]) ? this.validators[key](this.get(key)) : {
         isValid: true
      };
   },

   // TODO: Implement Backbone's standard validate() method instead.
   validateAll: function() {

      var messages = {};

      for (var key in this.validators) {
         if (this.validators.hasOwnProperty(key)) {
            var check = this.validators[key](this.get(key));
            if (check.isValid === false) {
               messages[key] = check.message;
            }
         }
      }

      return _.size(messages) > 0 ? {
         isValid: false,
         messages: messages
      } : {
         isValid: true
      };
   },

   defaults: {
      _id: null,
      name: "",
      type: "X",
      language: "EN",
      year: "",
      country: "China",
      description: "",
      picture: null
   }
});

window.BookCollection = Backbone.Collection.extend({

   model: Book,

   url: window.ROOTURL + "/books"

});
window.Movie = Backbone.Model.extend({

   urlRoot: window.ROOTURL + "/movies",

   idAttribute: "_id",

   initialize: function() {
      this.validators = {};

      this.validators.name = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a name"
         };
      };

      this.validators.type = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a Movie type"
         };
      };

      this.validators.language = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a language"
         };
      };
   },

   validateItem: function(key) {
      return (this.validators[key]) ? this.validators[key](this.get(key)) : {
         isValid: true
      };
   },

   // TODO: Implement Backbone's standard validate() method instead.
   validateAll: function() {

      var messages = {};

      for (var key in this.validators) {
         if (this.validators.hasOwnProperty(key)) {
            var check = this.validators[key](this.get(key));
            if (check.isValid === false) {
               messages[key] = check.message;
            }
         }
      }

      return _.size(messages) > 0 ? {
         isValid: false,
         messages: messages
      } : {
         isValid: true
      };
   },

   defaults: {
      _id: null,
      name: "",
      type: "X",
      language: "EN",
      year: "",
      country: "China",
      description: "",
      //videolist: ["video/muguang4_01.mp4","video/muguang4_02.mp4","video/muguang4_03.mp4"],
      videolist: "video/muguang4.mp4",
      picture: null
   }
});

window.MovieCollection = Backbone.Collection.extend({

   model: Movie,

   url: window.ROOTURL + "/movies"

});
window.Weibo = Backbone.Model.extend({

   urlRoot: window.ROOTURL + "/weibos",

   idAttribute: "_id",

   initialize: function() {
      this.validators = {};

      this.validators.name = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a name"
         };
      };
   },

   validateItem: function(key) {
      return (this.validators[key]) ? this.validators[key](this.get(key)) : {
         isValid: true
      };
   },

   // TODO: Implement Backbone's standard validate() method instead.
   validateAll: function() {

      var messages = {};

      for (var key in this.validators) {
         if (this.validators.hasOwnProperty(key)) {
            var check = this.validators[key](this.get(key));
            if (check.isValid === false) {
               messages[key] = check.message;
            }
         }
      }

      return _.size(messages) > 0 ? {
         isValid: false,
         messages: messages
      } : {
         isValid: true
      };
   },

   defaults: {
      _id: null,
   }
});

window.WeiboCollection = Backbone.Collection.extend({
   model: Weibo,
   url: window.ROOTURL + "/weibos"
});
window.Pic = Backbone.Model.extend({

   urlRoot: window.ROOTURL + "/pics",

   idAttribute: "_id",

   initialize: function() {
      this.validators = {};

      this.validators.url = function(value) {
         return value.length > 0 ? {
            isValid: true
         } : {
            isValid: false,
            message: "You must enter a location for a picture"
         };
      };
   },

   validateItem: function(key) {
      return (this.validators[key]) ? this.validators[key](this.get(key)) : {
         isValid: true
      };
   },

   // TODO: Implement Backbone's standard validate() method instead.
   validateAll: function() {

      var messages = {};

      for (var key in this.validators) {
         if (this.validators.hasOwnProperty(key)) {
            var check = this.validators[key](this.get(key));
            if (check.isValid === false) {
               messages[key] = check.message;
            }
         }
      }

      return _.size(messages) > 0 ? {
         isValid: false,
         messages: messages
      } : {
         isValid: true
      };
   },

   defaults: {
      _id: null,
      url: null,
   }
});
window.PicCollection = Backbone.Collection.extend({
   model: Pic,
   url: window.ROOTURL + "/pics"
});