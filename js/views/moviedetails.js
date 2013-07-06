window.VideoCodecItemView = Backbone.View.extend({
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
window.MovieView = Backbone.View.extend({

    initialize: function () {
       // _.bindAll(this,'render','openPlayer');
        this.render();
    },

    render: function () {
        console.log('DEBUGING');
        console.log(this.model.toJSON());
        var video_list = this.model.get('videolist');
        console.log(video_list);
        $(this.el).html(this.template(this.model.toJSON()));
        $('#classic',this.el).append('<div class="fp-playlist"></div>');
        //for (var i = 0; i < video_list.length; i++) {
        //    $('.fp-playlist', this.el).append("<a href=" + video_list[i] +"></a>");
        //}
        $('.fp-playlist', this.el).append("<a href=" + video_list +"></a>");
        return this;
    },

    events: {
        "change"        : "change",
        "click .play"   : "openPlayer",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteMovie",
    },
    openPlayer: function() {
       //app.navigate('player.html', false);
       $('#classic').flowplayer({
          ratio:0.532});
          var api = flowplayer();
          api.play(0);
          console.log("play...");


    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        console.log(target.name + " " + target.value);
        this.model.set(change);
        console.log("Change");
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveMovie();
        return false;
    },

    saveMovie: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('movies/' + model.id, false);
                utils.showAlert('Success!', 'Movie saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteMovie: function () {
        this.model.destroy({
            success: function () {
                alert('Movie deleted successfully');
                window.history.back();
            }
        });
        return false;
    },


});
