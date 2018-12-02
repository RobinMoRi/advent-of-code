#include <iostream>
#include <vector>
#include <algorithm>

int main(){
	signed int current_freq = 0, negative_num;
	int number_int;
	bool reload = true;
	std::string number_str;
	std::vector<int> frequencies;
	std::vector<signed int> freq_changes;
	while(std::getline(std::cin, number_str)){
	    number_int = 0; //Reset number_int
	    for(int i = 1; i < number_str.size(); i++){
	    	number_int = 10*number_int + ((int)number_str[i] - 48); //Conversion from string to integer
	    }
	    if(number_str[0] == '+'){ //Add integer to current frequency
	    	current_freq += number_int;
	    	freq_changes.push_back(number_int);
	    }
	    else if(number_str[0] == '-'){ //Subtract integer from current frequency
	    	current_freq -= number_int;
	    	negative_num = -number_int;
	    	freq_changes.push_back(negative_num);
	    }
	    if(std::find(frequencies.begin(), frequencies.end(), current_freq) != frequencies.end()){
	    	reload = false;
	   		break;
	   	}else{
	   		frequencies.push_back(current_freq);
	   }
	}

	//Reload list of changes in frequencies
	while(reload){
		for(int i = 0; i < freq_changes.size(); i++){
			current_freq += freq_changes.at(i);
			if(std::find(frequencies.begin(), frequencies.end(), current_freq) != frequencies.end()){
	    		reload = false;
	    		break;
	   		}else{
	   			frequencies.push_back(current_freq);
	   			//std::cout << current_freq << std::endl;
	   		}
		}
	}

	std::cout << current_freq << std::endl;

}