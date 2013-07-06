window.PicView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .delete" : "deletePic",
    },
    deletePic: function () {
        this.model.destroy({
            success: function () {
                alert('Pic deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

});
