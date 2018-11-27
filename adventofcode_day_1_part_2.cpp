//Advent of code day one 2017 part 2

// Day 1 - part 1 - adventofcode - Robin Moreno Rinding
#include <iostream>
#include <string>

int main()
{   
    std::string x;
    int sum = 0;
    std::cin >> x;
    int size = (int)x.size(); //length of input
    int half = size / 2;
    for(int i = 0; i < size; i++){
        if(i < half){
            if(x[i] == x[i + half]){
                sum += ((int)x[i] - 48); //Convert from char to int
            } 
        }
        else{
        	if(x[i] == x[abs(size - half - i)]){
        		sum += ((int)x[i] - 48); //Convert from char to int
        	}
        }
        
    }
    
    std::cout << sum << std::endl;
    
}