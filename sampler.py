import argparse
import csv
from itertools import chain
from itertools import product
import logging
import os
import pdb
from random import shuffle

from PIL import Image
from PIL import ImageOps


class Sample(object):
    def __init__(self, image, width, height, label):
        # load and normalize a white-on-black greyscale image
        image = image.convert(mode="L") # greyscale
        image = image.resize((width, height))
        if not file_name.startswith("dark"):
            image = ImageOps.invert(image)

        self.data = tuple(
            tuple(
                image.getpixel((x,y)) / 0xff
                for x in range(0, width)
            )
            for y in range(0, height)
        )
        self.width = width
        self.height = height
        self.label = label


    def print(self):
        for row in self.data:
            print(" ".join(str(round(val, 1)) for val in row))
        print(f"Label: {self.label}")


    def tsv_writer(file, labels, width, height):
        input_keys = (f"Ix{x}y{y}" for x, y in product(
            range(0, IMAGE_WIDTH), range(0, IMAGE_HEIGHT)
        ))
        output_keys = (f"O{label}" for label in labels)
        keys = chain(input_keys, output_keys)
        writer = csv.DictWriter(file, fieldnames=list(keys), delimiter="\t")
        writer.writeheader()
        return writer

    def write_tsv(self, writer):
        row = {key: 0.0 for key in writer.fieldnames}
        row.update({f"Ix{x}y{y}": self.data[x][y] for x, y in product(
            range(0, self.width), range(0, self.height)
        )})
        row[f"O{self.label}"] = 1.0
        writer.writerow(row)


def compile_tsv(path, samples_by_label, width, height):
    labels = sorted(samples_by_label.keys())
    with open(path, "w", newline="\n") as file: # newline="\n" prevents double breaks in Windows
        writer = Sample.tsv_writer(file, labels, width, height)
        for samples in samples_by_label.values():
            for sample in samples:
                sample.write_tsv(writer)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""
        Transform image sets (classified by directory) into .tsv files accepted
        by the Asteria training/testing engine.
    """)
    parser.add_argument(
        'dir',
        type=str,
        help="path of the directory containing the image set",
    )
    parser.add_argument(
        'width',
        type=int,
        help="width (px) to scale all images to",
    )
    parser.add_argument(
        'height',
        type=int,
        help="height (px) to scale all images to",
    )
    parser.add_argument(
        '-p',
        type=float,
        # https://www.researchgate.net/post/Is_there_an_ideal_ratio_between_a_training_set_and_validation_set_Which_trade-off_would_you_suggest
        # apparently about 70% of the data should be used for training
        default=0.7,
        help="""
            proportion of images that are used for training (rest are used for
            testing)
        """,
    )
    args = parser.parse_args()
    ROOT_DIR_NAME = args.dir
    IMAGE_WIDTH = args.width
    IMAGE_HEIGHT = args.height
    TRAINING_PROPORTION = args.p

    labels = []
    training_samples = {}
    testing_samples = {}

    for dir_name, subdir_names, file_names in os.walk(ROOT_DIR_NAME):
        if dir_name == ROOT_DIR_NAME:
            continue
        subdir_names.clear() # don't recurse into any subdirectories

        label = os.path.basename(dir_name).replace(" ", "_")
        labels.append(label)
        print(f"Label: {label}")

        samples = []
        for file_name in file_names:
            path = f"{dir_name}/{file_name}"
            print(f"\tSampling {path}")
            with Image.open(path) as image:
                sample = Sample(image, IMAGE_WIDTH, IMAGE_HEIGHT, label)
                # sample.print()
                samples.append(sample)

        shuffle(samples)
        mid_idx = round(TRAINING_PROPORTION * len(samples))
        training_samples[label] = samples[:mid_idx]
        testing_samples[label] = samples[mid_idx:]

    compile_tsv(ROOT_DIR_NAME + "training.tsv", training_samples, IMAGE_WIDTH, IMAGE_HEIGHT)
    compile_tsv(ROOT_DIR_NAME + "testing.tsv", testing_samples, IMAGE_WIDTH, IMAGE_HEIGHT)
