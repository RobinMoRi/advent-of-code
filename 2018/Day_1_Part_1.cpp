#include <iostream>

int main(){
	signed int sum = 0;
	int number_int;
	std::string number_str;
	while(std::getline(std::cin, number_str)){
	    number_int = 0; //Reset number_int
	    for(int i = 1; i < number_str.size(); i++){
	    	number_int = 10*number_int + ((int)number_str[i] - 48); //Conversion from string to integer
	    }
	    if(number_str[0] == '+'){ //Add integer to sum
	    	sum += number_int;
	    }
	    else if(number_str[0] == '-'){ //Subtract integer from sum
	    	sum -= number_int;
	    }
	}

	std::cout << sum << std::endl; // Print sum
}