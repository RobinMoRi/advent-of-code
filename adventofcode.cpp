// Day 1 - part 1 - adventofcode - Robin Moreno Rinding
#include <iostream>
#include <string>

using namespace std;

int main()
{   
    string x;
    int sum = 0;
    cin >> x;
    int size = (int)x.size();
    for(int i = 0; i < size; i++){
        if(i == 0){
            if(x[i] == x[size - 1]){
                sum += ((int)x[i] - 48);
            } 
        }
        else if(x[i] == x[i - 1]){
            sum += ((int)x[i] - 48);
        }
        
    }
    
    cout << sum << endl;
    
}
