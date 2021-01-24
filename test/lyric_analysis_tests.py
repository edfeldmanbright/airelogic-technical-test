from lyrics.analysis import perform_lyric_analysis


mock_lyrics = (
    "Love is a burning thing\r\nand it makes a firery ring\r\nbound by wild desire\r\n"
    "I fell in to a ring of fire...\r\nI...\n\nI fell for you like a child\n\noh, but the "
    "fire went wild..\n\n\n\nI fell in to a burning ring of fire"
)


def test_lyric_analysis():
    average_word_length = perform_lyric_analysis(mock_lyrics)
    assert average_word_length == 3.17
