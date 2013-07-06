window.ConfigView = Backbone.View.extend({

    initialize: function () {
        
        this.render();
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "change"        : "change",
        "click .save"   : "saveCfg",
    },
    change: function (event) {
        utils.hideAlert();
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        console.log(target.name + " " + target.value);
        this.model.set(change);
        console.log("Change");
    },
    saveCfg: function () {
        var self = this;
        console.log('save!');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('config/' + model.id, false);
                utils.showAlert('Success!', 'Config saved successfully', 'alert-success');
            },
            error: function () {
                console.log("ERROR");
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
      //HERRY: without return false, browser will go to home page, #
      return false;
    },

});
