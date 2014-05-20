require 'minitest/autorun'

class TestStringCalculator < MiniTest::Test

  def setup
    @string_calculator = StringCalculator.new
  end

  def test_empty_string_is_zero
    assert_equal 0, @string_calculator.add("")
  end

  def test_string_with_one_number
    assert_equal 1, @string_calculator.add("1")
  end

  def test_string_with_two_numbers
    assert_equal 3, @string_calculator.add("1,2")
  end

  def test_string_with_more_than_two_number
    assert_equal 10, @string_calculator.add("3,5,2")
  end

  def test_string_with_new_line_delimiter
    assert_equal 6, @string_calculator.add("1\n2,3")
  end

  def test_with_custom_delimiter
    assert_equal 14, @string_calculator.add("//;\n10;3;1")
  end

  def test_negatives
    assert_raises RuntimeError do
      @string_calculator.add("2,-5,7,-3")
    end
  end

  def test_bigger_than_one_thousand
    assert_equal 4, @string_calculator.add("1000,4,10008")
  end
end

class StringCalculator
  def add(string_number)
    string = string_number.dup
    extract_bigger_than_one_thousand(string)
    check_for_negatives(string)
    custom_delimeter(string)
    array = split_string(string)
    array.inject(0) { |sum, num| sum += num.to_i}
  end

  def custom_delimeter(string)
    delimeter = string.slice!(/\/\/.\n/)
    extract_custom_delimeter(delimeter, string)
  end

  def extract_custom_delimeter(delimeter, string)
    if delimeter
      char = delimeter[2]
      string.gsub!(char, ',')
    end
  end

  def split_string(string)
    regex = /(\,|\n)/
    string.split(regex)
  end

  def check_for_negatives(string)
    negatives = string.scan(/-\d/)
    raise "negatives not allowed #{negatives.join(',')}" if !negatives.empty?
  end

  def extract_bigger_than_one_thousand(string)
    string.gsub!(/\d\d\d\d*/, '')
    p string
  end
end


