
const model = {
    apiUrl : 'https://www.googleapis.com/books/v1/volumes', 
    keyword : 'javascript',
    currentBook: {},
    books: [],
    startIndex : 0,
    totalAvailableBooks : 0,
    hasMoreBook : true,
    itemPerPage : 10,
    nextStartIndex : function(){
        return model.startIndex + model.itemPerPage;
    }

}

const controller = {
    init: function () {
        this.retrieveBookFromAPI();
        bookView.init();
        bookListView.init();
        bookSearchView.init();
    },
    retrieveBookFromAPI: function () {
        bookListView.loadingIcon('show');
        fetch(`${model.apiUrl}?q=${model.keyword}&startIndex=${model.startIndex}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (books) {                
                model.books = model.books.concat(books.items);
                model.currentBook = books.items[0];

                if(books.totalItems < model.nextStartIndex()) {
                    model.hasMoreBook = false;
                }
                else {
                    model.startIndex = model.nextStartIndex();
                }

                bookListView.render();
                bookView.render();
                bookListView.loadingIcon('hide');
            });
    },
    getBooks: function () {
        return model.books;
    },
    hasMoreBook : function(){
        return model.hasMoreBook;
    },
    getCurrentBook: function () {
        return model.currentBook;
    },
    setCurrentBook: function (book) {
        model.currentBook = book;
        bookView.render();
    },
    searchBook: function(bookname){
        model.keyword = bookname;
        model.startIndex = 0;
        this.clearBookList();
        this.retrieveBookFromAPI();
    },
    clearBookList: function(){
        model.books = [];
        bookListView.clear();
    },
    loadMore: function(){
        if(model.hasMoreBook) {
            this.retrieveBookFromAPI();
        }
        else {
            alert('no more book to load');
        }
    }
}

const bookListView = {
    init: function () {
        this.bookListElem = document.getElementById('bookList');

        // const viewmore = document.getElementById('btnViewMore');
        window.addEventListener('scroll', function(){
            if(!model.hasMoreBook) {
                return false;
            }
            let bottom = document.documentElement.clientHeight;
            let currentBottom = Math.ceil(document.documentElement.getBoundingClientRect().bottom);
            if(currentBottom < bottom+2) {
                controller.loadMore();
                console.log(model.loadMoreCount);
            }
        }, false);
    },
    render: function () {
        this.clear();
        this.books = controller.getBooks();        
        this.books.forEach(function(book){            
            bookListView.bookListElem.appendChild(bookListView.buildBook(book));
        });        
    },
    buildBook : function(book){
        const bookDiv = document.createElement('div');
        // console.log(book);
        console.log(book.volumeInfo.title);
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
        <div class="content">
            <img src=${book.volumeInfo.imageLinks.smallThumbnail} alt="${book.volumeInfo.title}">
        </div>
        <div class="title">${book.volumeInfo.title}</div>
        `;
        bookDiv.addEventListener('click',function(){
            controller.setCurrentBook(book);
        });
        return bookDiv;
    },
    clear: function(){
        this.bookListElem.innerHTML = '';
    },
    loadingIcon: function(iconStatus){
        if(iconStatus == 'show') {
            document.getElementById('loading').classList.add("loader");
        }
        else {
            document.getElementById('loading').classList.remove("loader");
        }
    }
}

const bookView = {
    init: function(){
        this.viewport = document.getElementById('viewerCanvas');
        google.books.load();
        google.books.setOnLoadCallback(function(){                        
            bookView.render();    
        });
    },
    render: function () {    
        const viewer = new google.books.DefaultViewer(bookView.viewport);
        const currentBook = controller.getCurrentBook(); 
        viewer.load(currentBook.id);
    },

}

const bookSearchView = {
    init: function(){
        const searchbtn = document.getElementById('btnSearch');
        searchbtn.addEventListener('click', function(){
            const searchBookName = document.getElementById('txtSearch').value;
            controller.searchBook(searchBookName);
        });
    }
}


controller.init();
