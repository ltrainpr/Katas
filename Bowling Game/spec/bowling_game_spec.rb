require_relative '../bowling_game'

describe Game do
	
	it 'class instances should be available' do
		@game = Game.new
 	
		expect(@game).to be_an_instance_of Game
	end

	describe "#score" do
		before :each do
			@game = Game.new
		end

		def rolls(rolls, pins)
			1.upto(rolls) {@game.roll(pins)}
		end

		it 'should return 0 when all frames are 0' do
			rolls(20, 0)

			expect(@game.score).to eq 0
		end

		it 'should return 20 when all frames are 1' do
			rolls(20, 1)

			expect(@game.score).to eq 20
		end

		it 'should return 16 on spare and next roll of 3' do
			@game.roll(5)
			@game.roll(5)
			@game.roll(3)
			rolls(17, 0)

			expect(@game.score).to eq 16
		end

		it 'should return 26 on strike and next frame score of 8' do
			@game.roll(10)
			@game.roll(5)
			@game.roll(3)
			rolls(17, 0)

			expect(@game.score).to eq 26
		end

		it 'should return 300 for perfect score' do
			rolls(12, 10)

			expect(@game.score).to eq 300
		end
	end
end

