window.BookView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteBook",
        "drop #picture" : "dropHandler"
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
        this.saveBook();
        return false;
    },

    saveBook: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('books/' + model.id, false);
                utils.showAlert('Success!', 'Book saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteBook: function () {
        this.model.destroy({
            success: function () {
                alert('Book deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];
        console.log(this.pictureFile);

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
            self.model.set({picture: self.pictureFile.name});

            //Method1 : Using XHR directly
            //var req = new XMLHttpRequest();
            //req.open("POST","/upload/pic",true);
            //req.setRequestHeader("Content-type","image/jpeg");
            ////HERRY: don't send reader.result. Send blob/file !!!
            ////req.send(reader.result);// sending out base64 encoded string
            //req.send(self.pictureFile);// sending out raw file data

            //Method2 : Using formData
            //https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/FormData/Using_FormData_Objects
            //var formData = new FormData();
            //formData.append("data",self.pictureFile);
            //formData.append("title",self.pictureFile.name);
            //var req = new XMLHttpRequest();
            //req.open("POST","/upload/pic",true);
            //req.send(formData);// sending out raw file data
            
            //Method 3: Using formData + jQuery
            var formData = new FormData();
            formData.append("data",self.pictureFile);
            formData.append("title",self.pictureFile.name);
            jQuery.ajax({
               data: formData,
               url: "/upload/pic",
               type: "POST",
               processData:false,
               contentType:false,
               sucess: function() {console.log("upload succ");}
            });
            
        };
        reader.readAsDataURL(this.pictureFile);
        //reader.readAsBinaryString(this.pictureFile);
    }

});
