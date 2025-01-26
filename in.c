#include <iostream>
#include <thread>
#include <semaphore>
#include <queue>
#include <chrono>

using namespace std;

const int BUFFER_SIZE = 5; 
queue<int> buffer;         

counting_semaphore<BUFFER_SIZE> empty_slots(BUFFER_SIZE); 
counting_semaphore<BUFFER_SIZE> full_slots(0);            
mutex buffer_mutex;                                       

void producer(int id) {
    int item = 0;
    while (true) {
        this_thread::sleep_for(chrono::milliseconds(500)); 
        item = rand() % 100; 
        empty_slots.acquire();     
        {
            lock_guard<mutex> lock(buffer_mutex); 
            buffer.push(item);
            cout << "Producer " << id << " produced item: " << item << endl;
        }
        full_slots.release();      
    }
}

void consumer(int id) {
    while (true) {
        this_thread::sleep_for(chrono::milliseconds(1000));

        full_slots.acquire();       
        int item;
        {
            lock_guard<mutex> lock(buffer_mutex); 
            item = buffer.front();
            buffer.pop();
            cout << "Consumer " << id << " consumed item: " << item << endl;
        }
        empty_slots.release();   
    }
}

int main() {
    thread producers[] = {
        thread(producer, 1),
        thread(producer, 2)
    };

    thread consumers[] = {
        thread(consumer, 1),
        thread(consumer, 2)
    };

    for (auto& t : producers) {
        t.join();
    }

    for (auto& t : consumers) {
        t.join();
    }

    return 0;
}