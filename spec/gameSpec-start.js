describe("Game Controller Test", function () {

	describe('in isComplete function', function(){
		it('should return true if current positions are fit in', function(){
			expect(gameController.isComplete([1,2,3])).toBe(true);
			expect(gameController.isComplete([1])).toBe(false);
			expect(gameController.isComplete([3,2,1])).toBe(true);
			expect(gameController.isComplete([1,2,3,5,6])).toBe(true);
			expect(gameController.isComplete([1,4,7,5,6])).toBe(true);
			expect(gameController.isComplete([2,5,8])).toBe(true);
			expect(gameController.isComplete([3,6,9])).toBe(true);
		})

		it('should return true if diagonally correct', function(){
			expect(gameController.isComplete([1,5,9])).toBe(true);
			expect(gameController.isComplete([3,5,7])).toBe(true);
		})

		it('should return true if string include in the parameter', function(){
			expect(function(){
				gameController.isComplete(["1",2,3])
			}).toThrowError('Parameters must be a number array');
		});
	});

	describe('in the changePlayer funtion', function(){
		it('should change current player if changePlayer function is called', function(){
			const firstPlayer = gameController.getCurrentPlayer();
			gameController.changePlayer();

			expect(gameController.getCurrentPlayer()).not.toEqual(firstPlayer);
		});
	});

	describe('in the setPosition funtion', function(){
		it('should return true if input is smaller than 1 or larger than 9', function(){
			expect(function(){
				gameController.setPosition(10)
			}).toThrowError('Parameters must be between 1 or larger than 9');
		});

		it('should return true if input position is already selected by current user or opposition', function(){
			gameController.setPosition(1);
			expect(function(){
				gameController.setPosition(1)
			}).toThrowError('Position already selected');
		});
	});

	describe('in the restartGame funtion', function(){
		it('should change the current player to player 1', function(){
			gameController.changePlayer();
			gameController.restartGame();
			expect(gameController.getCurrentPlayer()).toEqual(1);
		});

		it('should empty the selected position of both players', function(){
			gameController.setPosition(1);
			gameController.restartGame();
			expect(gameModel.positionsOfPlayer1).toEqual([]);
			expect(gameModel.positionsOfPlayer2).toEqual([]);
		});
	});

	describe('in the selectPosition funtion', function(){
		it('should change the current player', function(){
			const firstPlayer = gameController.getCurrentPlayer();
			gameController.selectPosition(3);
			expect(gameController.getCurrentPlayer()).not.toEqual(firstPlayer);
		});
	});
});
