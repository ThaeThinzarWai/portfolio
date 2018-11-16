describe("Calculation Object Test", function () {
	beforeEach(function(){
    	controller.init();
  	});

	describe("in the gallery controller", function(){
		it("should return same image object in getCurrentImage", function(){
			const testObj = {
	        	main_url : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
	        	thumbnail : 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
	        	title : 'Image 1'

	        };

	        controller.setCurrentImage(testObj);

	        expect(controller.getCurrentImage()).toEqual(testObj);
		});
	});

});