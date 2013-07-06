window.PicListView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        var pics = this.model.models;
        var len = pics.length;
        console.log("Len of pictures " + len + " options " + this.options.page);
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        $(this.el).append('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new PicListItemView({model: pics[i]}).render().el);
        }
        $(this.el).append(new Paginator({model: this.model, page: this.options.page, category: 'pics'}).render().el);
        $(this.el).append("<a href='#pics/refresh' class='btn refresh'>重新获取列表</a>");
        $(this.el).append("<a href='#pics/random' class='btn random'>你跟新人合影了吗？</a>");


        return this;
    },
    events: {
        "click .refresh" : "refreshPic",
        "click .random" : "getRandomOne",
    },
    getRandomOne: function() {
       var self = this;
       $.get('pics/random', function(data) {
          console.log(data.id);
          var pic= new Pic({_id: data._id});
          pic.fetch({success: function(){
             $("#content").html(new PicView({model: pic}).el);
          }});
       });
    },
    refreshPic: function () {
        console.log('REFRESH');
        var self = this;
        this.model.reset();
        app.refreshpics(function () {
           console.log('re-rendering');
           app.listpics();
        });
        return false;
         
    },
    
});

window.PicListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
