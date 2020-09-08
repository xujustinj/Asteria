/*
 * Compiles monochrome bitmap data into training and testing .tsv files for
 * a classification engine.
 * 
 * The target directory should have the following structure:
 *   classname0
 *     whatever.bmp
 *     names.bmp
 *     ...
 *   classname1
 *     you.bmp
 *     want.bmp
 *     ...
 *   ...
 * 
 * This program assumes that each .bmp file follows a monochrome (black and
 * white) encoding, with dimensions 32x32 pixels. Such files always contain a
 * 62-byte header followed by the bit array of the 1024 pixels.
 */ 

#include <filesystem>
#include <fstream>
#include <iostream>
#include <map>
#include <memory>
#include <random>
#include <sstream>
#include <string>

namespace fs = std::filesystem;


// image dimensions
const size_t INPUT_WIDTH = 32;
const size_t INPUT_HEIGHT = 32;
const size_t INPUT_SIZE = INPUT_WIDTH * INPUT_HEIGHT;

// image header
const size_t HEADER_BYTES = 0x3e;
const size_t CHAR_BITS = sizeof(char) * 8;

// to partition data into training/testing buckets
std::default_random_engine gen{};
// https://www.researchgate.net/post/Is_there_an_ideal_ratio_between_a_training_set_and_validation_set_Which_trade-off_would_you_suggest
// apparently about 70% of the data should be used for training
const float TRAINING_RATIO = 0.7;


struct Input {
    const bool data[INPUT_WIDTH][INPUT_HEIGHT];
};
typedef std::string Output;


int main(int argc, char *argv[]) {
    if (argc != 3) {
        std::cout << "usage: " << argv[0] << " <data path> <output path>" << std::endl;
        return 1;
    }
    const std::string DATA_PATH = argv[1];
    const std::string OUTPUT_PATH = argv[2];

    std::map<Output, std::vector<Input>> training_samples{};
    std::map<Output, std::vector<Input>> testing_samples{};
    for (const fs::directory_entry &dir : fs::directory_iterator(DATA_PATH)) {
        if (!dir.is_directory()) {
            continue;
        }
        const Output classname = dir.path().stem().string();
        for (const fs::directory_entry &img : fs::recursive_directory_iterator(dir.path())) {
            if (!img.is_regular_file()) {
                continue;
            }
            // std::ifstream fs(img.path().string(), std::ios::binary);
            std::ifstream fs("./samples/A/2.bmp", std::ios::binary);
            if (!(fs.ignore(HEADER_BYTES))) {
                continue;
            }
            bool data[INPUT_SIZE] = {false}; // fill with 0
            for (size_t y = INPUT_HEIGHT; y > 0; --y) {
                for (size_t x = 0; x < INPUT_WIDTH; x += CHAR_BITS) {
                    unsigned char byte;
                    fs >> byte;
                    int i = byte;
                    std::cout << '\t' << i << '\t'; 
                    for (size_t pos = 0; pos < CHAR_BITS && x + pos < INPUT_WIDTH; ++pos) {
                        bool bit = (byte >> (CHAR_BITS - 1 - pos)) & 0b1;
                        std::cout << bit;
                        data[y * INPUT_WIDTH + x + pos] = bit;
                    }
                }
                std::cout << std::endl;
            }
            // std::ifstream ifs("./samples/A/wiki.bmp", std::ios::binary | std::ios::ate);
            // std::ifstream::pos_type pos = ifs.tellg();

            // std::vector<unsigned> bytes(pos);

            // ifs.seekg(0, std::ios::beg);
            // ifs.read(&bytes[0], pos);
            // for (unsigned byte : bytes) {
            //     std::cout << (int)byte << std::endl;
            // }

            return 0;
        }
    }
}