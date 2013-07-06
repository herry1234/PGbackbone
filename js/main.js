var AppRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "books": "list",
    "books/page/:page": "list",
    "books/add": "addBook",
    "books/:id": "bookDetails",
    "movies": "listmovies",
    "movies/page/:page": "listmovies",
    "movies/add": "addMovie",
    "movies/:id": "movieDetails",
    "weibos": "listweibo",
    "weibos/page/:page": "listweibo",
    "weibos/:id": "weiboDetails",
    "pics": "listpics",
    "pics/page/:page": "listpics",
    "pics/:id": "picDetails",
    "config/:type": "config",
    "config": "config",
    "about": "about"
  },

  initialize: function() {
    this.headerView = new HeaderView();
    $('.header').html(this.headerView.el);
  },

  home: function() {
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    $('#content').html(this.homeView.el);
    this.headerView.selectMenuItem('home-menu');
  },
  config: function(t) {
    if (t === undefined) t = 'weibo';
    var cfg = new Config({
      type: t
    });
    //var cfg = new Config();
    console.log(cfg);
    cfg.fetch({
      success: function() {
        $("#content").html(new ConfigView({
          model: cfg
        }).el);
      }
    });
    this.headerView.selectMenuItem('config-menu');
  },

  list: function(page) {
    //List of page #
    var p = page ? parseInt(page, 10) : 1;
    var bookList = new BookCollection();
    console.log(bookList);
    bookList.fetch({
      success: function() {
        $("#content").html(new BookListView({
          model: bookList,
          page: p
        }).el);
      }
    });
    this.headerView.selectMenuItem('home-menu');
  },
  listmovies: function(page) {
    console.log("list movies!");
    var p = page ? parseInt(page, 10) : 1;
    var movieList = new MovieCollection();
    console.log(movieList);
    movieList.fetch({
      success: function() {
        $("#content").html(new MovieListView({
          model: movieList,
          page: p
        }).el);
      }
    });
    this.headerView.selectMenuItem('home-menu-movie');
  },
  refreshweibo: function(cb) {
    console.log("entering refreshing");
    $.get('weibos/refresh', function(data) {
      //$('#content').html(data);
      //listweibo();
      cb();
    });
  },
  listweibo: function(page) {
    console.log("list weibo!");
    var p = page ? parseInt(page, 10) : 1;
    var weiboList = new WeiboCollection();
    console.log(weiboList);
    weiboList.fetch({
      success: function() {
        $("#content").html(new WeiboListView({
          model: weiboList,
          page: p
        }).el);
      }
    });
    this.headerView.selectMenuItem('home-menu-weibo');
  },
  weiboDetails: function(id) {
    var weibo = new Weibo({
      _id: id
    });
    weibo.fetch({
      success: function() {
        $("#content").html(new WeiboView({
          model: weibo
        }).el);
      }
    });
    this.headerView.selectMenuItem();
  },
  refreshpics: function(cb) {
    console.log("entering refreshing");
    $.get('pics/refresh', function(data) {
      //$('#content').html(data);
      //listpic();
      cb();
    });
  },
  listpics: function(page) {
    console.log("list pic!");
    var p = page ? parseInt(page, 10) : 1;
    var picList = new PicCollection();
    console.log(picList);
    picList.fetch({
      success: function() {
        $("#content").html(new PicListView({
          model: picList,
          page: p
        }).el);
      }
    });
    this.headerView.selectMenuItem('home-menu-pic');
  },
  picDetails: function(id) {
    var pic = new Pic({
      _id: id
    });
    pic.fetch({
      success: function() {
        $("#content").html(new PicView({
          model: pic
        }).el);
      }
    });
    this.headerView.selectMenuItem();
  },

  bookDetails: function(id) {
    var book = new Book({
      _id: id
    });
    console.log(book);
    book.fetch({
      success: function() {
        $("#content").html(new BookView({
          model: book
        }).el);
      }
    });
    this.headerView.selectMenuItem();
  },
  movieDetails: function(id) {
    var movie = new Movie({
      _id: id
    });
    movie.fetch({
      success: function() {
        $("#content").html(new MovieView({
          model: movie
        }).el);
      }
    });
    this.headerView.selectMenuItem();
  },

  addBook: function() {
    var book = new Book();
    $('#content').html(new BookView({
      model: book
    }).el);
    this.headerView.selectMenuItem('add-menu');
  },
  addMovie: function() {
    var movie = new Movie();
    $('#content').html(new MovieView({
      model: movie
    }).el);
    this.headerView.selectMenuItem('add-menu-movie');
  },

  about: function() {
    if (!this.aboutView) {
      this.aboutView = new AboutView();
    }
    $('#content').html(this.aboutView.el);
    this.headerView.selectMenuItem('about-menu');
  }

});

utils.loadTemplate(['HomeView', 'ConfigView', 'HeaderView', 'BookView', 'BookListItemView', 'MovieView', 'MovieListItemView', 'WeiboView', 'WeiboListItemView', 'PicView', 'PicListItemView', 'AboutView'], function() {
  app = new AppRouter();
  Backbone.history.start();
});