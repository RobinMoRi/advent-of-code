//Advent of code day one 2017 part 2

// Day 1 - part 1 - adventofcode - Robin Moreno Rinding
#include <iostream>
#include <string>
#include <fstream>
#include <list>


int main()
{   
    std::list<string> lines;
    lines.clear();
    std::ifstream file(input_day2_part1.txt);
    std::string s;
    while(getline(file, s)){
        lines.push_back(s);
    }

    for(std::list<int>::iterator i = lines.begin(); i != lines.end(); ++i){
        std::cout << i << std::endl;

    }
    
}