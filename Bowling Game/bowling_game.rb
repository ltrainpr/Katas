class Game
	def initialize
	  @score = []
	  @rolls = []
	  @frame = 0
		@counter = 0
	end

	def roll(pins)
		@rolls << pins
	end

	def score
		10.times do
			if roll_score == 10
				@frame = 10 + roll_score(1) + roll_score(2)
				add_frame
				next_frame(1)
				next 
			elsif frame == 10
				@frame = 10 + roll_score(2)
				add_frame
			else
				@frame = frame
				add_frame
			end
			next_frame(2)
		end
		@score.reduce(:+)
	end

	def next_frame(position)
		@counter += position
	end

	def frame
		roll_score + roll_score(1)
	end

	def add_frame
		@score << @frame
	end

	def roll_score(num=0)
		@rolls[@counter + num] 
	end
end