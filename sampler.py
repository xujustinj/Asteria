from collections import defaultdict
import csv
from itertools import chain
from itertools import product
import logging
import os
import pdb
from random import shuffle

from PIL import Image
from PIL import ImageOps


# TODO: make constants command line options instead
IMAGE_WIDTH = 32
IMAGE_HEIGHT = 32


class Sample(object):
    def __init__(self, image, label):
        # load and normalize a white-on-black greyscale image
        image = image.convert(mode="L") # greyscale
        image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))
        if not file_name.startswith("dark"):
            image = ImageOps.invert(image)

        self.data = tuple(
            tuple(
                image.getpixel((x,y)) / 0xff
                for x in range(0, IMAGE_WIDTH)
            )
            for y in range(0, IMAGE_HEIGHT)
        )
        self.label = label


    def print(self):
        for row in self.data:
            print(" ".join(str(round(val, 1)) for val in row))
        print(f"Label: {self.label}")


    def tsv_writer(file, labels):
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
            range(0, IMAGE_WIDTH), range(0, IMAGE_HEIGHT)
        )})
        row[f"O{self.label}"] = 1.0
        writer.writerow(row)


def compile_tsv(path, samples_by_label):
    labels = sorted(samples_by_label.keys())
    with open(path, "w", newline="\n") as file:
        writer = Sample.tsv_writer(file, labels)
        for samples in samples_by_label.values():
            for sample in samples:
                sample.write_tsv(writer)  
                
                
if __name__ == "__main__":
    # https://www.researchgate.net/post/Is_there_an_ideal_ratio_between_a_training_set_and_validation_set_Which_trade-off_would_you_suggest
    # apparently about 70% of the data should be used for training
    TRAINING_RATIO = 0.7
    labels = []
    training_samples = {}
    testing_samples = {}

    ROOT_DIR_NAME = "./samples/"
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
                sample = Sample(image, label)
                # sample.print()
                samples.append(sample)
        
        shuffle(samples)
        mid_idx = round(TRAINING_RATIO * len(samples))
        training_samples[label] = samples[:mid_idx]
        testing_samples[label] = samples[mid_idx:]

    compile_tsv(ROOT_DIR_NAME + "training.tsv", training_samples)
    compile_tsv(ROOT_DIR_NAME + "testing.tsv", testing_samples)