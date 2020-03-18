use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];
    println!("{}", filename);

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
