describe("Book API Test", function () {
	beforeEach(function(){
    	controller.init();
  	});

	describe("in the book preview controller", function(){
		it("should return same image object in getCurrentImage", function(){
			
			const testObj =  {
				            "kind": "books#volume",
				            "id": "_8tMXRbsi5oC",
				            "etag": "pikF4cSwChM",
				            "selfLink": "https://www.googleapis.com/books/v1/volumes/_8tMXRbsi5oC",
				            "volumeInfo": {
				                "title": "MySQL / PHP Database Applications",
				                "authors": [
				                    "Brad Bulger",
				                    "Jay Greenspan",
				                    "David Wall"
				                ],
				                "publisher": "John Wiley & Sons",
				                "publishedDate": "2003-11-10",
				                "description": "Demonstrates Web application development by presenting ten real, ready-to-use examples Samples start with a simple guess book and end with a fully-functional e-commerce site with a shopping cart New features include both MySQL 4.1 and PHP 4.2 Latest edition contains new applications including log analysis and project tracking CD-ROM includes all the code and examples applications from the book in addition to MySQL, PHP, Apache, PHP classes, libraries, utilities, and other tools",
				                "industryIdentifiers": [
				                    {
				                        "type": "ISBN_13",
				                        "identifier": "9780764537998"
				                    },
				                    {
				                        "type": "ISBN_10",
				                        "identifier": "0764537997"
				                    }
				                ],
				                "readingModes": {
				                    "text": false,
				                    "image": true
				                },
				                "pageCount": 808,
				                "printType": "BOOK",
				                "categories": [
				                    "Computers"
				                ],
				                "maturityRating": "NOT_MATURE",
				                "allowAnonLogging": false,
				                "contentVersion": "0.1.0.0.preview.1",
				                "panelizationSummary": {
				                    "containsEpubBubbles": false,
				                    "containsImageBubbles": false
				                },
				                "imageLinks": {
				                    "smallThumbnail": "http://books.google.com/books/content?id=_8tMXRbsi5oC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
				                    "thumbnail": "http://books.google.com/books/content?id=_8tMXRbsi5oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
				                },
				                "language": "en",
				                "previewLink": "http://books.google.com/books?id=_8tMXRbsi5oC&printsec=frontcover&dq=php&hl=&cd=11&source=gbs_api",
				                "infoLink": "http://books.google.com/books?id=_8tMXRbsi5oC&dq=php&hl=&source=gbs_api",
				                "canonicalVolumeLink": "https://books.google.com/books/about/MySQL_PHP_Database_Applications.html?hl=&id=_8tMXRbsi5oC"
				            }
				        };
	        controller.setCurrentBook(testObj);

	        expect(controller.getCurrentBook()).toEqual(testObj);
		});
	});

});