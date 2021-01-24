import re


def perform_lyric_analysis(lyrics):
    lyrics = re.sub('[^0-9a-zA-Z]+', ' ', lyrics)
    words = lyrics.split(' ')
    word_count = len(words)
    total_letters = sum([len(word) for word in words])
    average_word_length = round(total_letters / word_count, 2)
    return average_word_length
