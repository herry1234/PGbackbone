window.WeiboListView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        var weibo = this.model.models;
        var len = weibo.length;
        console.log("Len of weibo " + len + "options " + this.options.page);
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new WeiboListItemView({model: weibo[i]}).render().el);
        }
        $(this.el).append("<a href='#weibos/refresh' class='btn refresh'>重新获取列表</a>");
        $(this.el).append("<a href='#weibos/random' class='btn random'>祝福一下有机会中奖哦！</a>");

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, category: 'weibos'}).render().el);

        return this;
    },
    events: {
        "click .refresh" : "refreshWeibo",
        "click .random" : "getRandomOne",
    },
    getRandomOne: function() {
       var self = this;
       $.get('weibos/random', function(data) {
          console.log(data.id);
          var weibo= new Weibo({_id: data.id});
          weibo.fetch({success: function(){
             $("#content").html(new WeiboView({model: weibo}).el);
          }});
       });
    },
    refreshWeibo: function () {
       console.log('REFRESH');
       var self = this;
       this.model.reset();
      // this.model.fetch({success: function() { 
      //    app.listweibo();
      //    console.log('dfd');
      // }});
         
         //app.navigate('weibos/refresh', false);
         app.refreshweibo(function () {
            console.log('re-rendering');
            app.listweibo();
            //self.render();
         });
        return false;
         
    },
    
});

window.WeiboListItemView = Backbone.View.extend({

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
